import Immutable from 'immutable';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import d3 from 'd3';
import fc from 'd3fc';

import './order-depth-chart.scss';

export default class OrderDepthChart extends PureComponent {
  static sumBidDepth(depth) {
    const bidDepth = OrderDepthChart.cumulativelySum(depth);

    if (bidDepth.length > 0) {
      bidDepth.push({
        price: bidDepth[bidDepth.length - 1].price + 5,
        quantity: bidDepth[bidDepth.length - 1].quantity,
      });
    }

    return bidDepth;
  }

  static sumAskDepth(depth) {
    const askDepth = OrderDepthChart.cumulativelySum(depth, true)
      .reverse(); // reverse back into ascending order

    if (askDepth.length > 0) { // pad depth by hardcoded amount
      askDepth.unshift({ price: askDepth[0].price - 5, quantity: askDepth[0].quantity });
    }

    return askDepth;
  }

  static cumulativelySum(toSum, sumDescending = false) {
    return toSum.entrySeq()
      .sort((a, b) => {
        const result = parseFloat(a[0]) - parseFloat(b[0]);
        return sumDescending ? -result : result;
      })
      .reduce((depth, [price, quantity], index) => {
        const previousQuantity = depth[index - 1] ? depth[index - 1].quantity : 0;
        depth.push({ price: parseFloat(price), quantity: quantity + previousQuantity });
        return depth;
      }, []);
  }

  componentDidUpdate() {
    const cumulativeBidDepth = OrderDepthChart.sumBidDepth(this.props.bidDepth);
    const cumulativeAskDepth = OrderDepthChart.sumAskDepth(this.props.askDepth);
    const data = cumulativeAskDepth.concat(cumulativeBidDepth);

    // create a chart with two linear axes
    const chart = fc.chart.cartesian(d3.scale.linear(), d3.scale.linear())
      .xDomain(fc.util.extent().fields(['price'])(data))
      .yDomain([0, d3.max(data, tier => tier.quantity) + 5]);

    // create a series and associate it with the plot area
    const bidLine = fc.series.area()
      .xValue(d => d.price)
      .yValue(d => d.quantity)
      .interpolate('step-after')
      .decorate(selection => selection.attr('class', 'area bid-depth'));

    const askLine = fc.series.area()
      .xValue(d => d.price)
      .yValue(d => d.quantity)
      .interpolate('step-before')
      .decorate(selection => selection.attr('class', 'area ask-depth'));

    const multi = fc.series.multi()
      .series([bidLine, askLine])
      .mapping(function getLine(series) {
        switch (series) {
          case bidLine:
            return this[0];
          case askLine:
          default:
            return this[1];
        }
      });

    chart.plotArea(multi);

    // render the chart
    d3.select(this.chart)
      .datum([cumulativeBidDepth, cumulativeAskDepth])
      .call(chart);
  }

  render() {
    return (
      <div className="order-depth-chart-container panel-container">
        <h5 className="header">ORDER DEPTH CHART</h5>
        <div
          className="order-depth-chart"
          ref={(chart) => {
            this.chart = chart;
          }}
        />
      </div>
    );
  }
}

OrderDepthChart.propTypes = {
  bidDepth: PropTypes.instanceOf(Immutable.Map).isRequired,
  askDepth: PropTypes.instanceOf(Immutable.Map).isRequired,
};

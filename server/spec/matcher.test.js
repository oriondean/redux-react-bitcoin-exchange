const Matcher = require('../app/matcher');
const Order = require('../app/order/order');

describe('Matcher', () => {
  let matcher;

  let matchSpy;

  beforeEach(() => {
    matcher = new Matcher();

    matchSpy = jest.spyOn(matcher, 'match');
  });

  it('matches bid orders with ask orders', () => {
    const order = new Order(1, 1, 1, 'bid', 'test');

    matcher.onNewOrder(order);

    expect(matchSpy).toHaveBeenCalledWith(order, matcher.askOrders);
  });

  it('matches ask orders with bid orders', () => {
    const order = new Order(1, 1, 1, 'ask', 'test');

    matcher.onNewOrder(order);

    expect(matchSpy).toHaveBeenCalledWith(order, matcher.bidOrders)
  });

  it('removes any fully matched orders', () => {
    matcher.bidOrders = [new Order(1, 15, 20, 'bid', 'test')];

    expect(matcher.bidOrders.length).toBe(1);

    matcher.onNewOrder(new Order(1, 15, 20, 'ask', 'test'));

    expect(matcher.bidOrders.length).toBe(0);
  });

  it('reduces quantity of any partially matched orders', () => {
    matcher.bidOrders = [new Order(1, 15, 20, 'bid', 'test')];

    matcher.onNewOrder(new Order(1, 25, 10, 'ask', 'test'));

    expect(matcher.bidOrders[0].quantity).toBe(10);
  });

  it('adds new order if it isn\'t fully matched', () => {
    matcher.bidOrders = [new Order(1, 25, 10, 'bid', 'test')];

    matcher.onNewOrder(new Order(1, 35, 20, 'ask', 'test'));

    expect(matcher.askOrders[0].quantity).toBe(10);
    expect(matcher.askOrders[0].price).toBe(35);
  });

  it('maintains sorting of bid orders by best price when new one is added', () => {
    matcher.bidOrders = [new Order(1, 15, 10, 'bid', 'test'), new Order(1, 20, 10, 'bid', 'test'), new Order(1, 25, 10, 'bid', 'test')];

    matcher.onNewOrder(new Order(1, 30, 10, 'bid', 'test'));
    expect(matcher.bidOrders.map(order => {
      return order.price
    })).toEqual([15, 20, 25, 30]);

    matcher.onNewOrder(new Order(1, 7, 10, 'bid', 'test'));
    expect(matcher.bidOrders.map(order => {
      return order.price
    })).toEqual([7, 15, 20, 25, 30]);

    matcher.onNewOrder(new Order(1, 23, 10, 'bid', 'test'));
    expect(matcher.bidOrders.map(order => {
      return order.price
    })).toEqual([7, 15, 20, 23, 25, 30]);
  });

  it('maintains sorting of bid orders by time when new one is added', () => {
    matcher.bidOrders = [new Order(1, 15, 10, 'bid', 'test'), new Order(1, 15, 15, 'bid', 'test')];

    matcher.onNewOrder(new Order(1, 15, 20, 'bid', 'test'));

    expect(matcher.bidOrders[2].quantity).toBe(20);
  });

  it('maintains sorting of ask orders by best price when new one is added', () => {
    matcher.askOrders = [new Order(1, 25, 10, 'ask', 'test'), new Order(1, 20, 10, 'ask', 'test'), new Order(1, 15, 10, 'ask', 'test')];

    matcher.onNewOrder(new Order(1, 30, 10, 'ask', 'test'));
    expect(matcher.askOrders.map(order => {
      return order.price
    })).toEqual([30, 25, 20, 15]);

    matcher.onNewOrder(new Order(1, 7, 10, 'ask', 'test'));
    expect(matcher.askOrders.map(order => {
      return order.price
    })).toEqual([30, 25, 20, 15, 7]);

    matcher.onNewOrder(new Order(1, 23, 10, 'ask', 'test'));
    expect(matcher.askOrders.map(order => {
      return order.price
    })).toEqual([30, 25, 23, 20, 15, 7]);
  });

  it('maintains sorting of ask orders by time when new one is added', () => {
    matcher.askOrders = [new Order(1, 15, 10, 'ask', 'test'), new Order(1, 15, 15, 'ask', 'test')];

    matcher.onNewOrder(new Order(1, 15, 20, 'ask', 'test'));

    expect(matcher.askOrders[2].quantity).toBe(20);
  });

  it('doesn\'t add new order if it is fully matched', () => {
    matcher.bidOrders = [new Order(1, 25, 10, 'bid', 'test')];

    matcher.onNewOrder(new Order(1, 35, 10, 'ask', 'test'));

    expect(matcher.askOrders.length).toBe(0);
    expect(matcher.bidOrders.length).toBe(0);
  });

  it('matches bid order with best available ask order', () => {
    matcher.askOrders = [new Order(1, 25, 10, 'ask', 'test'), new Order(1, 24, 10, 'ask', 'test')];

    matcher.onNewOrder(new Order(1, 20, 10, 'bid', 'test'));

    expect(matcher.askOrders[0].price).toBe(24);
  });

  it('matches ask order with best available bid order', () => {
    matcher.bidOrders = [new Order(1, 24, 10, 'bid', 'test'), new Order(1, 25, 10, 'bid', 'test')];

    matcher.onNewOrder(new Order(1, 30, 10, 'ask', 'test'));

    expect(matcher.bidOrders[0].price).toBe(25);
  });

  it('matches orders at existing orders price', () => {
    matcher.bidOrders = [new Order(1, 10, 15, 'bid', 'test')];

    matcher.onNewOrder(new Order(1, 20, 15, 'ask', 'test'));

    expect(matcher.trades[0].price).toBe(10);
    expect(matcher.trades[0].quantity).toBe(15);
  });

  it('matches orders at lowest quantity between them', () => {
    matcher.bidOrders = [new Order(1, 10, 15, 'bid', 'test')];

    matcher.onNewOrder(new Order(1, 10, 30, 'ask', 'test'));

    expect(matcher.trades[0].price).toBe(10);
    expect(matcher.trades[0].quantity).toBe(15);
  });
});

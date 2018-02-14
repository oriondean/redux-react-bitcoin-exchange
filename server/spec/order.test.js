const Order = require('../app/order/order');

describe('Order', () => {
  describe('invalid order action', () => {
    it('is thrown if order is provided with any action other than buy/sell', () => {
      expect(() => {
        new Order(1, 1, 1, 'test', 'test');
      }).toThrowError('Invalid order action');
    });

    it('isn\'t thrown for buy action', () => {
      expect(() => {
        new Order(1, 1, 1, 'ask', 'test');
      }).not.toThrowError('Invalid order action');
    });

    it('isn\'t thrown for sell action', () => {
      expect(() => {
        new Order(1, 1, 'bid', 'test');
      }).not.toThrowError('Invalid order action');
    });
  });

  describe('invalid price', () => {
    it('is thrown if order is not provided a price', () => {
      expect(() => {
        new Order(1, undefined, 1, 'bid', 'test');
      }).toThrowError('Invalid price');
    });

    it('is thrown if order is provided a non-numeral price', () => {
      expect(() => {
        new Order(1, null, 1, 'bid', 'test');
      }).toThrowError('Invalid price');
    });

    it('isn\'t thrown if order is provided a numeral price', () => {
      expect(() => {
        new Order(1, 1, 1, 'bid', 'test');
      }).not.toThrowError('Invalid price');
    });

    it('isn\'t thrown if order is provided a negative price', () => {
      expect(() => {
        new Order(1, -10, 1, 'bid', 'test');
      }).not.toThrowError('Invalid price');
    });

    it('isn\'t thrown if order is provided a positive price', () => {
      expect(() => {
        new Order(1, 5, 1, 'bid', 'test');
      }).not.toThrowError('Invalid price');
    });
  });

  describe('invalid quantity', () => {
    it('is thrown if order is not provided a quantity', () => {
      expect(() => {
        new Order(1, 1, undefined, 'bid', 'test');
      }).toThrowError('Invalid quantity');
    });

    it('is thrown if order is provided a non-numeral quantity', () => {
      expect(() => {
        new Order(1, 1, null, 'bid', 'test');
      }).toThrowError('Invalid quantity');
    });

    it('is thrown if order is provided a zero quantity', () => {
      expect(() => {
        new Order(1, 1, 0, 'bid', 'test');
      }).toThrowError('Invalid quantity');
    });

    it('is thrown if order is provided a negative quantity', () => {
      expect(() => {
        new Order(1, 1, -10, 'bid', 'test');
      }).toThrowError('Invalid quantity');
    });

    it('isn\'t thrown if order is provided a positive quantity', () => {
      expect(() => {
        new Order(1, 1, 5, 'bid', 'test');
      }).not.toThrowError('Invalid quantity');
    });
  });

  describe('can match', () => {
    it('returns false for orders with the same action', () => {
      let order = new Order(1, 1, 1, 'ask', 'test');
      expect(order.canMatch(new Order(1, 1, 1, 'ask', 'test'))).toBe(false);

      order = new Order(1, 1, 1, 'bid', 'test');
      expect(order.canMatch(new Order(1, 1, 1, 'bid', 'test'))).toBe(false);
    });

    it('returns true if order prices are equal', () => {
      let order = new Order(1, 1, 1, 'ask', 'test');
      expect(order.canMatch(new Order(1, 1, 1, 'bid', 'test'))).toBe(true);

      order = new Order(1, 1, 1, 'bid', 'test');
      expect(order.canMatch(new Order(1, 1, 1, 'ask', 'test'))).toBe(true);
    });

    it('returns false if buy order price is lower than sell order price', () => {
      const order = new Order(1, 1, 1, 'ask', 'test');
      expect(order.canMatch(new Order(1, 2, 1, 'bid', 'test'))).toBe(false);
    });

    it('returns false if sell order price is higher than buy order price', () => {
      const order = new Order(1, 2, 1, 'bid', 'test');
      expect(order.canMatch(new Order(1, 1, 1, 'ask', 'test'))).toBe(false);
    });
  });
});

var Order = require("../app/order/order");

describe("Order", function() {
    describe("invalid order action", function() {
        it("is thrown if order is provided with any action other than buy/sell", function() {
            expect(function() {
                new Order(1, 1, 1, "test", "test");
            }).toThrowError("Invalid order action");
        });

        it("isn't thrown for buy action", function() {
            expect(function() {
                new Order(1, 1, 1, "ask", "test");
            }).not.toThrowError("Invalid order action");
        });

        it("isn't thrown for sell action", function() {
            expect(function() {
                new Order(1, 1, "bid", "test");
            }).not.toThrowError("Invalid order action");
        });
    });

    describe("invalid price", function() {
        it("is thrown if order is not provided a price", function() {
            expect(function() {
                new Order(1, undefined, 1, "bid", "test");
            }).toThrowError("Invalid price");
        });

        it("is thrown if order is provided a non-numeral price", function() {
            expect(function() {
                new Order(1, null, 1, "bid", "test");
            }).toThrowError("Invalid price");
        });

        it("isn't thrown if order is provided a numeral price", function() {
            expect(function() {
                new Order(1, 1, 1, "bid", "test");
            }).not.toThrowError("Invalid price");
        });

        it("isn't thrown if order is provided a negative price", function() {
            expect(function() {
                new Order(1, -10, 1, "bid", "test");
            }).not.toThrowError("Invalid price");
        });

        it("isn't thrown if order is provided a positive price", function() {
            expect(function() {
                new Order(1, 5, 1, "bid", "test");
            }).not.toThrowError("Invalid price");
        });
    });

    describe("invalid quantity", function() {
        it("is thrown if order is not provided a quantity", function() {
            expect(function() {
                new Order(1, 1, undefined, "bid", "test");
            }).toThrowError("Invalid quantity");
        });

        it("is thrown if order is provided a non-numeral quantity", function() {
            expect(function() {
                new Order(1, 1, null, "bid", "test");
            }).toThrowError("Invalid quantity");
        });

        it("is thrown if order is provided a zero quantity", function() {
            expect(function() {
                new Order(1, 1, 0, "bid", "test");
            }).toThrowError("Invalid quantity");
        });

        it("is thrown if order is provided a negative quantity", function() {
            expect(function() {
                new Order(1, 1, -10, "bid", "test");
            }).toThrowError("Invalid quantity");
        });

        it("isn't thrown if order is provided a positive quantity", function() {
            expect(function() {
                new Order(1, 1, 5, "bid", "test");
            }).not.toThrowError("Invalid quantity");
        });
    });

    describe("can match", function() {
        it("returns false for orders with the same action", function() {
            var order = new Order(1, 1, 1, "ask", "test");
            expect(order.canMatch(new Order(1, 1, 1, "ask", "test"))).toBe(false);

            order = new Order(1, 1, 1, "bid", "test");
            expect(order.canMatch(new Order(1, 1, 1, "bid", "test"))).toBe(false);
        });

        it("returns true if order prices are equal", function() {
            var order = new Order(1, 1, 1, "ask", "test");
            expect(order.canMatch(new Order(1, 1, 1, "bid", "test"))).toBe(true);

            order = new Order(1, 1, 1, "bid", "test");
            expect(order.canMatch(new Order(1, 1, 1, "ask", "test"))).toBe(true);
        });

        it("returns false if buy order price is lower than sell order price", function() {
            var order = new Order(1, 1, 1, "ask", "test");
            expect(order.canMatch(new Order(1, 2, 1, "bid", "test"))).toBe(false);
        });

        it("returns false if sell order price is higher than buy order price", function() {
            var order = new Order(1, 2, 1, "bid", "test");
            expect(order.canMatch(new Order(1, 1, 1, "ask", "test"))).toBe(false);
        });
    });
});
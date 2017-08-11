var express = require('express')
    _       = require('lodash')

var app = module.exports = express.Router()

var items = [{
    id: 1,
    name: 'name',
    description: 'item',
    amount: 1
}]

var orders = [{
    id: 1,
    item: 'name',
    amount: 1,
}]

function getItem(req) {
    var name;
    var itemSearch = {};

    if(req.body.item) {
        name = req.body.item;
        itemSearch = { name: name };
    }

    return {
        name: name,
        itemSearch: itemSearch
    }
}

function getOrder(req) {
    var item;
    var orderSearch = {};

    if(req.body.item) {
        item = req.body.item;
        orderSearch = { item: item };
    }

    return {
        item: item,
        orderSearch: orderSearch
    }
}
app.post('/items/create', function(req, res) {
    var anItem = getItem(req);
    if (!anItem.name || !req.body.description) {
        return res.status(400).send("You must send the item name and description");
    }

    if (_.find(items, anItem.itemSearch)) {
        var item = _.pick(req.body);


        let item = this.items.find(function(obj) {
            return obj.name == item.name;
        })

        let index  = this.items.indexOf(item);

        this.items[index].amount += 2;
        //

        item.amount = _.max(items, 'amount').amount + 1;


        items.push(item);
        return res.status(201).send("Item added");
    }

    var item = _.pick(req.body);
    item.id = _.max(items, 'id').id + 1;
    items.push(item);
    res.status(201).send("Item added");
});

app.post('/orders/create', function(req, res) {
    var anOrder = getOrder(req);
    if (!anOrder.item || !req.body.amount) {
        return res.status(400).send("You must specify the item");
    }

    if (_.find(orders, anOrder.orderSearch)) {
        return res.status(400).send("That order already exists");
    }

    var order = _.pick(req.body);
    order.id = _.max(orders, 'id').id + 1;
    orders.push(order);
    res.status(201).send("Order added");
});

<template>
    <div>
        <cart :checkout-bool="checkoutBool" :cart="cart" :cart-total="cartTotal" @checkout="checkoutRequest" @reset="clear" @change="checkoutState" @calculate="getTotal" @positive="checkoutStatePlus"></cart>
        <checkout-modal :cart-total="cartTotal" :show-modal="showModal" @hide="hideModal" @add="createOrder" @reset="clear"></checkout-modal>
        <tabs>
            <tab name="All items">
                <all-items :items="items" @delete="remove" :cart="cart" :cart-total="cartTotal" @calculate="getTotal" @change="checkoutState" @positive="checkoutStatePlus" @edit="editPage"></all-items>
            </tab>
            <tab :name="naming">
                <create-item @add="create" v-show="isEmpty(item)"></create-item>
                <edit-item :item="item" v-show="! isEmpty(item)" @edit="update"></edit-item>
            </tab>
            <tab name="Checkout" v-if="checkoutBool">
                <checkout v-if="checkoutBool" :cart="cart" :cart-total="cartTotal" @checkout="checkoutRequest" @change="checkoutState" @calculate="getTotal"></checkout>
            </tab>
            <tab name="Orders">
                <all-orders :orders="orders"></all-orders>
            </tab>
        </tabs>
    </div>
</template>
<script>
    export default {
        name: 'Items',
        data () {
            return {
                items: [{
                    id: 1,
                    name: 'name',
                    description: 'item',
                    amount: 1,
                    price: 10
                }],
                orders: [{
                    id: 1,
                    date: '08/15/2017',
                    price: 10
                }],
                checkoutBool: false,
                cart: [],
                cartTotal: 0,
                showModal: false,
                item: {}
            }
        },
        computed: {
            naming () {
                return this.isEmpty(this.item) ? 'New item' : 'Edit Item'
            }
        },
        methods: {
            create (item) {
                let onething = this.items.find(function(obj) {
                    return obj.name == item.name;
                })
                if(onething) {
                    onething.amount = this.number (onething.amount, item.amount)
                }
                else {
                    var id = this.items[this.items.length - 1].id
                    item.id = id+1
                    this.items.push(item)
                }
            },
            createOrder (order) {
                var id = this.orders[this.orders.length - 1].id
                order.id = id+1
                this.orders.push(order)
            },
            update (item) {
                let onething = this.items.find(function(obj) {
                    return obj.id == item.id;
                })
                if(onething) {
                    onething.name = item.name
                    onething.description = item.description
                    onething.amount = item.amount
                    onething.price = item.price
                }
                this.item = {}
            },
            editPage(item) {
                this.item = item
            },
            number (a, b) {
                return (a * 100 + b * 100)/100
            },
            remove (item) {
                this.items.splice(item, 1)
            },
            checkoutState () {
                this.checkoutBool = false
            },
            checkoutStatePlus () {
                this.checkoutBool = true
            },
            clear () {
                this.checkoutBool = false;
                this.cart = [];
                this.cartTotal = 0;
            },
            getTotal (total) {
                this.cartTotal = total
            },
            checkoutRequest () {
                this.showModal = true
            },
            hideModal() {
                this.showModal = false;
            },
            isEmpty(obj) {
                for(var key in obj) {
                    if(obj.hasOwnProperty(key))
                        return false;
                }
                return true;
            }
        }
    }
</script>
<style lang="scss"></style>
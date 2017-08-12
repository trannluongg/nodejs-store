<template>
    <tabs>
        <tab name="All items">
            <cart :checkout-bool="checkoutBool" :cart="cart" :cart-total="cartTotal" @reset="clear"></cart>
            <all-items :items="items" @delete="remove" :cart="cart" :cart-total="cartTotal" @total="sum" @change="checkoutState"></all-items>
            <checkout v-if="checkoutBool" :cart="cart" :cart-total="cartTotal"></checkout>
        </tab>
        <tab name="New item">
            <create-item :items="items" @add="update"></create-item>
        </tab>
        <tab name="View item">
            Third tab content
        </tab>
    </tabs>
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
                checkoutBool: false,
                cart: [],
                cartTotal: 0
            }
        },
        computed: {

        },
        methods: {
            update (item) {
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
            number (a, b) {
                return (a * 100 + b * 100)/100
            },
            remove (item) {
                this.items.splice(item, 1)
            },
            sum (num) {
                this.cartTotal = num
            },
            checkoutState () {
                this.checkoutBool = true
            },
            clear () {
                this.cart = [];
                this.cartTotal = 0;
                this.checkoutBool = false;
            }
        },
        events: {
            "checkoutRequest": function () {
                this.$broadcast("checkoutRequest");
            }
        }
    }
</script>
<style lang="scss"></style>
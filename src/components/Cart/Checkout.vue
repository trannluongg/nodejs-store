<template>
    <div>
        <h1>Checkout Area</h1>
        <div class="checkout-area">
            <span> {{ cart | cartSize }} </span><i class="fi fi-shopping-cart"></i>
            <table>
                <thead>
                <tr>
                    <th class="text-center">Id</th>
                    <th class="text-center">Name</th>
                    <th class="text-center">Description</th>
                    <th class="text-center">Amount</th>
                    <th class="text-center">Price</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in cart" :key="item.id">
                    <td class="align-center">{{ item.id }}</td>
                    <td>{{ item.name }}</td>
                    <td>{{ item.description }}</td>
                    <td class="align-right">{{ item.quantity }}</td>
                    <td class="align-right">{{ item.price }}/=</td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td class="align-right">Total:</td>
                    <td class="align-right"><h4 v-if="cartTotal != 0"> {{ cartTotal }}/= </h4></td>
                </tr>
                </tbody>
            </table>
            <button v-show="cartTotal" @click="propagateCheckout()" class="button success radius">Checkout</button>
        </div>

    </div>
</template>
<script>
    export default {
        props: ['cart', 'cartSize', 'cartTotal', 'showModal'],
        data: function() {
            return {
                total: 1
            }
        },

        filters: {
//            customPluralize: function(cart) {
//                var newName;
//
//                if(cart.quantity > 1) {
//                    newName = cart.product + "s";
//                    return newName;
//                }
//
//                return cart.product;
//            },

            cartSize (cart) {
                var cartSize = 0;

                for (var i = 0; i < cart.length; i++) {
                    cartSize += cart[i].quantity;
                }

                return cartSize;
            }
        },

        methods: {
            removeItem: function(item) {
                this.cart.splice(newItem, 1);
                this.total = this.cartTotal - (item.price * item.quantity);
                this.$emit('calculate', this.total)

                if(this.cart.length <= 0) {
                    this.$emit('change')
                }
            },
            propagateCheckout () {
                this.$emit('checkout');
            }
        },

        //intercept the checkout request broadcast
        //run our function

    }
</script>
<style lang="scss"></style>
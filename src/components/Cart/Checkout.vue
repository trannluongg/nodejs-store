<template>
    <div>
        <h1>Checkout Area</h1>
        <div class="checkout-area">
            <span> {{ cart | cartSize }} </span><i class="fi-shopping-cart"></i>
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
                    <td class="align-right">{{ item.amount }}</td>
                    <td class="align-right">{{ item.price }}</td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td class="align-right">Total:</td>
                    <td class="align-right"><h4 v-if="cartTotal != 0"> {{ cartTotal }} </h4></td>
                </tr>
                </tbody>
            </table>
            <button v-show="cartTotal" @click="checkoutModal()">Checkout</button>
        </div>
        <div class='modalWrapper' v-show='showModal'>
            <div class='overlay' @click='hideModal()'></div>
            <div class='modal checkout'>
                <i class='close fa fa-times' @click='hideModal()'></i>
                <h1>Checkout</h1>
                <div>We accept: <i class='fa fa-stripe'></i> <i class='fa fa-cc-visa'></i> <i class='fa fa-cc-mastercard'></i> <i class='fa fa-cc-amex'></i> <i class='fa fa-cc-discover'></i></div><br>
                <h3> Total: {{ cartTotal }} </h3>
                <br>
                <div>This is where our payment processor goes</div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        props: ['cart', 'cartSize', 'cartTotal'],
        data: function() {
            return {
                showModal: false
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
                    cartSize += cart[i].amount;
                }

                return cartSize;
            }
        },

        methods: {
            removeItem: function(item) {
                this.cart.$remove(item);
                this.cartTotal = this.cartTotal - (item.price * item.amount);

                if(this.cart.length <= 0) {
                    this.checkoutBool = false;
                }
            },
            checkoutModal: function() {
                this.showModal = true;
                console.log("CHECKOUT", this.cartTotal);

            },
            hideModal: function() {
                //hide modal and empty modal data
                this.showModal = false;
            }
        },

        //intercept the checkout request broadcast
        //run our function
        events: {
            "checkoutRequest": function() {
                this.checkoutModal();
            }
        }
    }
</script>
<style lang="scss"></style>
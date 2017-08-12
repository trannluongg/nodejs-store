<template>
    <div class="cart">
        <span class="cart-size" @click="showCart = !showCart"> {{ cart | cartSize }} </span><i class="fi fi-shopping-cart" @click="showCart = !showCart"></i>
        <div class="cart-items" v-show="showCart">
            <table class="cartTable">
                <tr class="product" v-for="item in cart" :key="item.id">
                    <td class="text-center"><button @click="quantityChange(item, 'decreament')" class="button hollow tiny"><i class="close fa fa-minus"></i>-</button></td>
                    <td class="text-center">{{ item.amount }}</td>
                    <td class="text-center"><button @click="quantityChange(item, 'increament')" class="button hollow tiny"><i class="close fa fa-plus"></i>+</button></td>
                    <td class="text-center">{{ item.name }}</td>
                    <td class="text-center">{{ item.price }}</td>
                </tr>
            </table>
            <hr>
            <h4 class="cartSubTotal" v-show="showCart"> {{ cartTotal }} </h4>
            <button class="clearCart button small alert" v-show="checkoutBool" @click="clearCart()"> Clear Cart </button>
            <button class="checkoutCart button small success" v-show="checkoutBool" @click="propagateCheckout()"> Checkout </button>
        </div>
    </div>
</template>
<script>
    export default {
        props: ['checkoutBool', 'cart', 'cartTotal'],
        data () {
            return {
                showCart: false,
            }
        },
        filters: {
//            customPluralize: function(cart) {
//                var newName;
//
//                if(cart.quantity > 1) {
//                    if(cart.product === "Peach") {
//                        newName = cart.product + "es";
//                    } else if(cart.product === "Puppy") {
//                        newName = cart.product + "ies";
//                        newName = newName.replace("y", "");
//                    } else {
//                        newName = cart.product + "s";
//                    }
//
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
            removeItem (item) {
                this.cart.$remove(item);
                this.cartTotal = this.cartTotal - (item.price);
                if(this.cart.length <= 0) {
                    this.checkoutBool = false;
                }
            },
            cartSize () {
                var cartSize = 0;

                for (var i = 0; i < cart.length; i++) {
                    cartSize += cart[i].amount;
                }

                return cartSize;
            },
            clearCart () {
                this.$emit('reset');
                this.showCart = false;
            },

            quantityChange: function(item, direction) {
                for (var i = 0; i < this.cart.length; i++) {
                    if (this.cart[i].id === item.id) {

                        var newItem = this.cart[i];

                        if(direction === "increament") {
                            newItem.amount = newItem.amount + 1;
                            this.cart[i] = newItem;

                        } else {
                            newItem.amount = newItem.amount - 1;

                            if(newItem.amount == 0) {
                                this.cart.$remove(newItem);

                            } else {
                                this.cart[i] = newItem;
                            }
                        }
                    }
                }

                if(direction === "increament") {
                    this.cartTotal = this.sum(this.cartTotal, item.price);

                } else {
                    this.cartTotal = this.subtract(this.cartTotal, item.price);
                }


                if(this.cart.length <= 0) {
                    this.checkoutBool = false;
                }
            },
            sum (a, b) {
                return (a * 100 + b * 100)/100
            },
            subtract (a, b) {
                return (a * 100 - b * 100)/100
            },
//send our request up the chain, to our parent
//our parent catches the event, and sends the request back down
            propagateCheckout: function() {
                this.$emit("checkoutRequest");
            }
        }
    }
</script>
<style lang="scss"></style>

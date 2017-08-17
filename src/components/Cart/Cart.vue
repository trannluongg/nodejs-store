<template>
    <div class="cart">
        <span class="cart-size" @click="showCart = !showCart"> {{ cart | cartSize }} </span><i class="fi fi-shopping-cart" @click="showCart = !showCart"></i>
        <div class="cart-items" v-show="showCart">
            <table class="cartTable">
                <tr class="product" v-for="item in cart" :key="item.id">
                    <td class="text-center"><button @click="quantityChange(item, 'decrement')" class="button hollow tiny"><i class="close fa fa-minus"></i>-</button></td>
                    <td class="text-center">{{ item.quantity }}</td>
                    <td class="text-center"><button @click="quantityChange(item, 'increment')" class="button hollow tiny"><i class="close fa fa-plus"></i>+</button></td>
                    <td class="text-center">{{ item.name }}</td>
                    <td class="text-center">{{ item.price }}</td>
                    <td>
                        <button class="button small alert radius" @click="removeItem(item)">&times;</button>
                    </td>
                </tr>
            </table>
            <hr>
            <h4 class="cartSubTotal" v-show="showCart"> {{ cartTotal }} </h4>
            <button class="clearCart button small alert" v-show="checkoutBool" @click="clearCart()"> Clear Cart </button>
            <button class="checkoutCart button small success" v-show="checkoutBool" @click="propagateCheckout"> Checkout </button>
        </div>
    </div>
</template>
<script>
    export default {
        props: ['checkoutBool', 'cart', 'cartTotal'],
        data () {
            return {
                showCart: false,
                total: 1
            }
        },
        filters: {
            cartSize (cart) {
                var cartSize = 0;

                for (var i = 0; i < cart.length; i++) {
                    cartSize += cart[i].quantity;
                }
                return cartSize;
            }
        },

        methods: {
            removeItem (item) {
                this.total = this.cartTotal - (item.price);
                var newItem = item
                this.$emit('calculate', this.total).$emit('remove', newItem)
                this.cart.splice(item, 1);
                if(this.cart.length <= 0) {
                    this.$emit('change')
                }
            },
            clearCart () {
                this.$emit('reset');
                this.showCart = false;
            },
            quantityChange: function(item, direction) {
                for (var i = 0; i < this.cart.length; i++) {
                    if (this.cart[i].id === item.id) {

                        var newItem = this.cart[i];
                        var cartItem = {
                            id: newItem.id,
                            name: newItem.name,
                            price: newItem.price,
                            quantity: 1
                        }

                        if(direction === "increment") {
                            newItem.quantity = newItem.quantity + 1;
                            this.cart[i] = newItem;
                            this.$emit('increase', cartItem)

                        } else {
                            newItem.quantity = newItem.quantity - 1;

                            this.$emit('remove', cartItem)

                            if(newItem.quantity == 0) {
                                this.cart.splice(newItem, 1);

                            } else {
                                this.cart[i] = newItem;
                            }
                        }
                    }
                }
                if(direction === "increment") {
                    this.total = this.sum(this.cartTotal, item.price);
                    this.$emit('calculate', this.total)
                } else {
                    this.total = this.subtract(this.cartTotal, item.price);
                    this.$emit('calculate', this.total)
                }

                if(this.cart.length <= 0) {
                    this.$emit('change')
                }
            },
            sum (a, b) {
                return (a * 100 + b * 100)/100
            },
            subtract (a, b) {
                return (a * 100 - b * 100)/100
            },
            propagateCheckout () {
                this.showCart = false;
                this.$emit('checkout');
            }
        }
    }
</script>
<style lang="scss"></style>

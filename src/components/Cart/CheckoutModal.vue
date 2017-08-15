<template>
    <div class='modalWrapper' v-show='showModal'>
        <div class='overlay' @click='hideModal()'></div>
        <div class='modal checkout'>
            <button class="button secondary hollow tiny corner" @click='hideModal()'>X</button>
            <div class="none">
                <h1>Checkout</h1>
                <!--<div>We accept: <i class='fa fa-stripe'></i> <i class='fa fa-cc-visa'></i> <i class='fa fa-cc-mastercard'></i> <i class='fa fa-cc-amex'></i> <i class='fa fa-cc-discover'></i></div><br>-->
                <h3> Total: {{ cartTotal }}/= </h3>
                <br>
                <div>This is where our payment processor goes</div>
                <button class="other-corner button alert round" @click='hideModal()'>Cancel</button>
                <a href="/items#orders" class="corner button success round" @click="save">Checkout</a>
            </div>
        </div>
    </div>
</template>
<script>
    import VueNotifications from 'vue-notifications'
    import moment from 'moment'
    export default {
        props: ['showModal', 'cartTotal'],
        data () {
            return {
                date: null,
                amount: '',
                price: '',
                item: {}
            }
        },
        methods: {
            hideModal() {
                this.$emit('hide');
            },
            save () {
                this.item = {
                    date: moment(),
                    price: this.cartTotal,
                }
                this.$emit('add', this.item).$emit('hide').$emit('reset');
                VueNotifications.success({message: 'Order added successfully!'})
            }
        }
    }
</script>
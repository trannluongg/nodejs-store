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
                <button class="corner button success round">Checkout</button>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        props: ['showModal', 'cartTotal'],
        methods: {
            hideModal() {
                this.$emit('hide');
            }
        }
    }
</script>
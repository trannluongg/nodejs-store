<template>
    <div>
        <form @submit.prevent="save()">
            <h5>Place an order for items</h5>
            <label>Item:
                <input type="text" name="item" id="item" v-model="item" required>
            </label>
            <label>Quantity:
                <input type="number" name="amount" id="amount" v-model="amount" required>
            </label>
            <button class="button success">Order</button>
            <button class="button secondary clear">Cancel</button>
        </form>
    </div>
</template>
<script>
    export default {
        props: ['orders'],
        name: 'create-order',
        data () {
            return {
                item: '',
                amount: ''
            }
        }
    }
</script>
<style lang="scss"></style>
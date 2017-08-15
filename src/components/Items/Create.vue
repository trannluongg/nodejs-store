<template>
    <div>
        <form @submit.prevent="save()">
            <h5>Add an item</h5>
            <label>Name:
                <input type="text" name="name" id="name" v-model="name" required>
            </label>
            <label>Description:
                <textarea name="description" id="description" v-model="description" required></textarea>
            </label>
            <label>Quantity:
                <input type="number" name="amount" id="amount" v-model="amount" required>
            </label>
            <label>Price:
                <input type="number" name="price" id="price" v-model="price" required>
            </label>
            <button class="button success" @click.prevent()="save">Save</button>
            <a href="/items#all-items" class="button secondary clear">Cancel</a>
        </form>
    </div>
</template>
<script>
    import VueNotifications from 'vue-notifications'
    export default {
        name: 'create-item',
        data () {
            return {
                name: '',
                description: '',
                amount: '',
                price: '',
                item: {}
            }
        },
        methods: {
            save () {
                this.item = {
                    name: this.name,
                    description: this.description,
                    amount: this.amount,
                    price: this.price,
                }
                this.$emit('add', this.item)
                this.item = {}
                this.name = ''
                this.description = ''
                this.amount = ''
                this.price = ''
                VueNotifications.success({message: 'Item added successfully!'})
            }
        },
        notifications: {
//            showLoginError: {
//                title: 'Login Failed',
//                message: 'Failed to authenticate',
//                type: 'error'
//            }
        },
    }
</script>
<style lang="scss"></style>
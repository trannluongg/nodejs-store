<template>
    <div>
        <form @submit.prevent="save()">
            <h5>Edit an item</h5>
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
            <button class="button secondary clear">Cancel</button>
        </form>
    </div>
</template>
<script>
    import VueNotifications from 'vue-notifications'
    export default {
        props: ['item'],
        name: 'edit-item',
        data () {
            return {
                name: '',
                description: '',
                amount: '',
                price: '',
                obj: {}
            }
        },
        methods: {
            save () {
                this.obj = {
                    id: this.item.id,
                    name: this.name,
                    description: this.description,
                    amount: this.amount,
                    price: this.price,
                }
                this.$emit('edit', this.obj)
                this.obj = {}
                this.name = ''
                this.description = ''
                this.amount = ''
                this.price = ''
                VueNotifications.success({message: 'Item edited successfully!'})
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
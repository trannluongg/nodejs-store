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
            <a href="/items#all-items" class="button success" @click="save">Save</a>
            <a href="/items#all-items" class="button secondary clear" @click="clear">Cancel</a>
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
                name: this.item.name,
                description: this.item.description,
                amount: this.item.amount,
                price: this.item.price,
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
                this.$emit('edit', this.obj).$emit('clear')
                this.obj = {}
                this.name = ''
                this.description = ''
                this.amount = ''
                this.price = ''
                VueNotifications.success({message: 'Item edited successfully!'})
            },
            clear () {
                this.$emit('clear')
            }
        },
        watch: {
            item () {
                this.name = this.item.name
                this.description = this.item.description
                this.amount = this.item.amount
                this.price = this.item.price
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
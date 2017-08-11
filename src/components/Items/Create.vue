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
            <button class="button success" @click.prevent()="save">Save</button>
            <button class="button secondary clear">Cancel</button>
        </form>
    </div>
</template>
<script>
    import VueNotifications from 'vue-notifications'
    export default {
        props: ['items'],
        name: 'create-item',
        data () {
            return {
                name: '',
                description: '',
                amount: '',
                item: {}
            }
        },
        methods: {
            save () {
                this.item = {
                    name: this.name,
                    description: this.description,
                    amount: this.amount
                }
                this.$emit('add', this.item)
                this.item = {}
                this.name = ''
                this.description = ''
                this.amount = ''
                VueNotifications.success({message: 'Item added successfully!'})
            }
        },
        notifications: {
            itemAdded:{
                title: 'Item',
                message: 'Item added successfully',
                type: 'success'
            },
            showLoginError: {
                title: 'Login Failed',
                message: 'Failed to authenticate',
                type: 'error'
            }
        },
    }
</script>
<style lang="scss"></style>
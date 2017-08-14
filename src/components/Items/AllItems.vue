<template>
    <div>
        <table>
            <thead>
            <tr>
                <th class="text-center">Id</th>
                <th class="text-center">Name</th>
                <th class="text-center">Description</th>
                <th class="text-center">Amount</th>
                <th class="text-center">Price</th>
                <th class="text-center">Actions</th>
            </tr>
            </thead>
            <tbody v-for="(item, index) in items" :key="item.id">
            <tr class="text-center">
                <td>{{ item.id }}</td>
                <td>{{ item.name }}</td>
                <td>{{ item.description }}</td>
                <td>{{ item.amount }}</td>
                <td>{{ item.price }}</td>
                <td>
                    <button @click="editItem(item)" class="button small secondary hollow round">Edit</button>
                    <button @click="viewItem(item)" class="button small hollow round">View</button>
                    <button @click="deleteItem(index)" class="button alert small hollow round">Delete</button>
                </td>
                <td>
                    <button @click="addToCart(item)" class="button secondary round">Add to cart</button>
                </td>
            </tr>
            </tbody>
        </table>
        <div class='modalWrapper' v-show='showModal'>
            <div class='overlay' @click='hideModal()'></div>
            <div class='modal'>
                <button class="button secondary hollow tiny corner" @click='hideModal()'>X</button>
                <div class="none">
                    <div class='name'>Name: {{ modalData.name }}</div>
                    <div class='description'>Description: {{ modalData.description }}</div>
                    <div class='details'>Amount available: {{ modalData.amount }}</div>
                    <h3 class='price'>Price: {{ modalData.price }}/=</h3>
                    <label for='modalAmount'>QTY</label>
                    <input id='modalAmount' :value='modalAmount' v-model='modalAmount' class='amount text-center' @keyup.enter='modalAddToCart(modalData), hideModal()'/>
                    <br><br>
                    <button @click='modalAddToCart(modalData), hideModal()' class="button secondary round">Add to Cart</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import VueNotifications from 'vue-notifications'
    export default {
        props: ['items', 'cart', 'cartTotal'],
        data () {
            return {
                showModal: false,
                modalData: {},
                modalAmount: 1,
                total: 1
            }
        },
        methods: {
            addToCart (item) {
                var found = false;
                for (var i = 0; i < this.cart.length; i++) {
                    if (this.cart[i].id === item.id) {
                        var newItem = this.cart[i];
                        newItem.amount = newItem.amount + 1;
                        this.cart[i] =  newItem;
//                        console.log("DUPLICATE",  this.cart[i].name + "'s quantity is now: " + this.cart[i].quantity);
                        found = true;
                        break;
                    }
                }
                if(!found) {
                    item.amount = 1;
                    this.cart.push(item);
                }
                this.total = this.sum(this.cartTotal, item.price);
                this.$emit('calculate', this.total)
                this.$emit('positive')
            },
            viewItem (item) {
                this.modalData = (JSON.parse(JSON.stringify(item)));
                this.showModal = true;
            },
            deleteItem (item) {
                this.$emit('delete', item)
                VueNotifications.success({message: 'Item deleted successfully!'})
            },
            modalAddToCart (modalData) {
                for(var i = 0; i < this.modalAmount; i++) {
                    this.addToCart(modalData);
                }
                this.modalAmount = 1;
            },
            sum (a, b) {
                return (a * 100 + b * 100)/100
            },
            hideModal () {
                this.modalData = {};
                this.showModal = false;
            },
        }
    }
</script>
<style lang="scss">
    .corner  {
        float: right;
    }
    .other-corner {
        float: left;
    }
    .none {
        clear: both;
    }
</style>
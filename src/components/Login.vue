<template>
    <div class='container'>
        <div class="row">
            <div class="medium-6 columns">
                <div class="primary callout">
                    <form>
                        <div class="row">
                            <label>Name:
                                <input type="text" name="name" id="name" required>
                            </label>
                            <label>Password:
                                <input type="password" name="password" id="password" required>
                            </label>
                            <button type="submit" class="button">Login</button>
                            <a href="#" class="button clear">Cancel</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'login',
        data(){
            return {}
        }
    }
</script>
<style lang="scss"></style>
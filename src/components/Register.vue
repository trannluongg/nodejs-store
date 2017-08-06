<template>
    <div class='container'>
        <div class="medium-6 columns">
            <div class="primary callout">
                <form>
                    <div class="row">
                        <label>Name:
                            <input type="text" name="name" id="name">
                        </label>
                        <label>Password:
                            <input type="password" name="password" id="password">
                        </label>
                        <label>Confirm Password:
                            <input type="password" name="password" id="password">
                        </label>
                        <button type="submit" class="button">Submit</button>
                        <a href="#" class="button clear">Cancel</a>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'register',
        data() {
            return{}
        }
    }
</script>
<style lang="scss"></style>
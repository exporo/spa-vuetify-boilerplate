<template>
    <v-container
            fill-height
            fluid
    >
        <v-row justify="center">
            <v-col
                    cols="12"
                    md="12"
            >
                <br><br><h3>Profile</h3>
                <div class="row">
                    <pre class="rounded w-100"><code class="json">{{JSON.stringify($auth.user, null, 2)}}</code></pre>
                </div>
                <br><br><h3>ID Token</h3>
                <div class="row">
                    <pre class=""><code class="json">{{JSON.stringify($auth.idToken, null, 2)}}</code></pre>
                </div>
                <br><br><h3>Access Token</h3>
                <div class="row">
                    <pre class="rounded w-100"><code class="json">{{JSON.stringify($auth.accessToken, null, 2)}}</code></pre>
                </div>
            </v-col>

        </v-row>
    </v-container>
</template>

<script>
    export default {
        //
    }
</script>

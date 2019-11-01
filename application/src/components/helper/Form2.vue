<template>
    <v-container
            fluid
            fill-height
    >
        <v-row
                align="center"
                justify="center"
        >
            <v-col cols="12">
                <material-card
                        v-if="successful"
                        color="green"
                        title="Yeah"
                        text="Successful created"
                >

                </material-card>

                <material-card
                        v-if="!successful"
                        color="green"
                        :title="title"
                        :text="text"
                >


                    <p class="error red" v-for="error in customErrors">
                        {{ error }}
                    </p>

                    <v-form
                            ref="form"
                    >
                        <v-row>
                            <template v-for="item in fields">
                                <v-col cols="6" v-if="item.type === 'text'">
                                    <v-text-field
                                            :label="item.label"
                                            v-model="model[item.name]"
                                            :error-messages="errors[item.name]"

                                    />
                                </v-col>
                                <v-col cols="12" v-if="item.type === 'textarea'">
                                    <v-textarea
                                            :label="item.label"
                                            v-model="model[item.name]"
                                            :error-messages="errors[item.name]"

                                    />
                                </v-col>
                            </template>
                        </v-row>

                        <v-btn class="green pl-right" v-on:click="onSave">Save</v-btn>
                        <br> <br>
                        <br>
                    </v-form>
                </material-card>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
    export default {
        name: 'Form2',
        data() {
            return {
                customErrors: [],
                successful: false
            }
        },
        methods: {
            onSave() {
                this.customErrors = [];
                this.$refs.form.resetValidation();
                this.$refs.form.validate();

                this.callback()
                    .then((response) => {
                        this.successful = true;
                    })
                    .catch((error) => {
                        error.response.data.forEach((item) => {
                            if (this.fields.some(e => e.name === item.context.key)) {
                                this.errors[item.context.key] = item.message;
                            } else {
                                this.customErrors.push(item.message);
                            }
                        })
                    })
            },
        },
        props: ['title', 'text', 'fields', 'model', 'errors', 'callback']
    }

</script>

<style>
</style>


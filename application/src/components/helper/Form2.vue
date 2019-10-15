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
                        color="green"
                        :title="title"
                        :text="text"
                >

                    <v-form
                            ref="form"
                    >
                        <!-- form wrapper -->
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
        methods: {
            onSave () {
                console.log('updated model', this.model)
                this.$refs.form.resetValidation()
                this.$refs.form.validate()
                this.errors.last_name = 'My Error2'
                callback()
            },
        },
        props: ['title', 'text', 'fields', 'model', 'errors', 'callback']
    }

</script>

<style>
</style>


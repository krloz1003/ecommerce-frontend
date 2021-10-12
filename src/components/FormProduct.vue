<template>
 <v-row justify="center">
	<v-dialog v-model="show" persistent max-width="600px" >	
		<v-card :loading="loading">
			<template slot="progress">
				<v-progress-linear
					color="deep-purple"
					height="10"
					indeterminate
				></v-progress-linear>
			</template>				
			<v-card-title>
				<span class="text-h5">New product</span>
			</v-card-title>
			<v-card-text>
				<v-container>
					<v-alert text prominent type="error" icon="report_problem" v-show="errors.message">
						{{ errors.message }}
						<span v-for="(rows, index) in errors.errors" :key="index">
							<p v-for="row in rows" :key="row">{{ row }}</p>
						</span>
					</v-alert>		
					<v-form ref="form" v-model="valid" lazy-validation>
						<v-row>
							<v-col cols="12">
								<v-text-field
									label="Name *"
									type="text"
									v-model="form.name"
									:rules="rules.name"
									required
								></v-text-field>
								</v-col>
								<v-col cols="12">
									<v-textarea
										label="Description *"
										v-model="form.description"
										:rules="rules.description"
									></v-textarea>
								</v-col>
								<v-col cols="12">
									<v-text-field
										label="Price*"									
										required
										v-model="form.price"
										:rules="rules.price"
									></v-text-field>
							</v-col>
						</v-row>
					</v-form>
				</v-container>
				<small>* Indicates required field</small>
			</v-card-text>
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn color="blue darken-1" text @click="show = false" >
					Close
				</v-btn>
				<v-btn color="blue darken-1" :loading="loading" text @click="storeItem()" >
					Save
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</v-row>
</template>
<script>
import ProductService from "../services/ProductService";

export default {
	data: () => ({
		show: false,
		valid: false,
		loading: false,
		form: {
			id: '',
			name: '',
			description: '',
			price: ''
		},
		rules: {
			name: [
				v => !!v || 'Name is required',
				v => v.length >= 7 || 'The Name must be at least 7 characters.',
				v => v.length <= 50 || 'The Name may not be greater than 50 characters.',
			],
			description: [
				v => !!v || 'Description is required',
				v => v.length >= 10 || 'The Description must be at least 7 characters.',
				v => v.length <= 250 || 'The Description may not be greater than 50 characters.',
			],
			price: [
				v => !!v || 'Price is required',
				v => v.length <= 250 || 'Description must be less than 250 characters',
				v => v > 0 || 'The price must be between 0 and 999.99.',
				v => v < 999.99 || 'The price must be between 0 and 999.99.'
			],
		},
		errors: []

	}),
	created: function() {
		this.$parent.$on('formProductShow', this.showForm);
		this.$parent.$on('formProductEdit', this.formProductEdit);
	},
	methods: {
		showForm(){
			this.show = true;
		},
		formProductEdit(slug){
			ProductService.get(slug)
			.then(res => {
				this.form.id = res.data.id;
				this.form.name = res.data.name;
				this.form.description = res.data.description;
				this.form.price = res.data.price;
				this.show = true;
			});
		},
		storeItem(){
			this.loading = true;
			this.$refs.form.validate()
			if(!this.valid) return false;

			if(this.form.id){
				ProductService.update(this.form.id, this.form)
				.then(res => {
					this.form.name = '';
					this.form.description = '';
					this.form.price = '';
					this.$root.$emit('getProducts');
					this.show = false;
					this.validate = false;
					this.loading = false;
					this.$emit('snackbarShow', res);
					
				})
				.catch((res) => {
					this.errors = (res.response != undefined)? res.response.data : [];
					this.loading = false;
				});				
			} else {
				ProductService.store(this.form)	
				.then(res => {
					this.form.name = '';
					this.form.description = '';
					this.form.price = '';
					this.$root.$emit('getProducts');
					this.show = false;
					this.validate = false;
					this.loading = false;
					this.$emit('snackbarShow', res);
					
				})
				.catch((res) => {
					this.errors = (res.response != undefined)? res.response.data : [];
					this.loading = false;
				});				
			}			
		}
	}
}
</script>
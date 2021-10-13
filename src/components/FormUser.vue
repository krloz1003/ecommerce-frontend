<template>
 <v-row justify="center">
	<v-dialog v-model="show" persistent max-width="600px" >	
		<v-card :loading="loading">
			<v-card-title>
				<span class="text-h5">New user</span>
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
							<v-col cols="12" >
								<v-text-field
									v-model="form.email"
									:rules="rules.email"
									label="E-mail *"
									required
								></v-text-field>
							</v-col>
							<v-col cols="12">
								<v-text-field
									v-model="form.password"
									:rules="rules.password"
									label="Password *"
									type="password"
									required
								></v-text-field>
							</v-col>
							<v-col cols="12">
								<v-text-field
									v-model="form.password_confirmation"
									:rules="rules.password_confirmation"
									label="Password confirmation *"
									type="password"
									required
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
import UserService from "../services/UserService";

export default {
	data: () => ({
		show: false,
		valid: false,
		loading: false,
		form: {
			id: '',
			name: '',
			email: '',
			password: '',
			password_confirmation: ''
		},
		rules: {
			name: [
				v => !!v || 'Name is required',
				v => v.length >= 4 || 'The Name must be at least 4 characters.',
				v => v.length <= 50 || 'The Name may not be greater than 50 characters.',
			],
			email: [
				v => !!v || 'E-mail is required',
				v => /.+@.+/.test(v) || 'E-mail must be valid',
			],
			password: [
				v => !!v || 'Password is required',
				v => v.length >= 8 || 'The Password must be at least 8 characters.',
			],
			password_confirmation: [
				v => !!v || 'Password confirmation is required',
				v => v.length >= 8 || 'The Password confirmation must be at least 8 characters.',
			],			
		},
		errors: []
	}),
	created: function() {
		this.$parent.$on('formUserShow', this.showForm);
		this.$parent.$on('formUserEdit', this.formUserEdit);
	},
	methods: {
		showForm(){
			this.show = true;
		},
		hideForm(){
			this.show = false;
			this.resetForm();			
		},		
		formUserEdit(id){
			UserService.get(id)
			.then(res => {
				this.form.id = res.data.id;
				this.form.name = res.data.name;
				this.form.email = res.data.email;
				this.show = true;
			});
		},
		resetForm(){
			this.form.id = '';
			this.form.name = '';
			this.form.email = '';
			this.form.password = '';
			this.form.password_confirmation = '';
			this.validate = false;				
		},
		storeItem(){			
			this.$refs.form.validate()
			if(!this.valid) return false;
			this.loading = true;
			
			if(this.form.id){
				UserService.update(this.form.id, this.form)
				.then(res => {
					this.resetForm();
					this.$root.$emit('getUsers');
					this.show = false;
					this.$emit('snackbarShow', res);
					this.loading = false;
				})
				.catch((res) => {
					this.errors = (res.response != undefined)? res.response.data : [];
					this.loading = false;
				});				
			} else {
				UserService.store(this.form)	
				.then(res => {
					this.resetForm();
					this.$root.$emit('getUsers');
					this.show = false;
					this.$emit('snackbarShow', res);
					this.loading = false;
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
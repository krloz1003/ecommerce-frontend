<template>
<v-row dense>	
	<v-col cols="12">
		<v-card>
			<v-card-title>
				<v-btn tile color="success" @click="create()">
					<v-icon left>
						add
					</v-icon>
					Add
				</v-btn>
				<v-spacer></v-spacer>
				<v-text-field
					v-model="search"
					append-icon="mdi-magnify"
					label="Search"
					single-line
					hide-details
				></v-text-field>
			</v-card-title>			
		</v-card>
	</v-col>
	<v-col cols="12">
		<v-data-table
			:headers="headers"
			:items="rows"
			:search="search"
			:items-per-page="5"
			class="elevation-1"
		>
			<template v-slot:item.price="{ item }">
				{{ item.price | currency }}
			</template>
			<template v-slot:item.picture="{ item }">				
				<v-img 
					v-if="item.media" 
					:src="getUrl(item.media)"
					width="50px"
				></v-img>
			</template>
			<template v-slot:item.status="{ item }">
				<v-chip :color="getColor(item.status)" dark x-small >
					{{ (item.status)? 'ENABLED' : 'DISABLED' }}
				</v-chip>
			</template>
			<template v-slot:item.actions="{ item }">
				<v-icon
					small
					@click="editStatus(item)"
				>autorenew
				</v-icon>
				<v-icon
					small
					class="mr-2"
					@click="edit(item)"
				>edit
				</v-icon>
				<v-icon
					small
					@click="deleting(item)"
				>delete
				</v-icon>
			</template>

		</v-data-table>
		<cmp-confirmation />
		<cmp-toas />
		<form-product />
	</v-col>
</v-row>
</template>
<script>
import ProductService from "../services/ProductService";

import CmpConfirmation from "./CmpConfirmation";
import CmpToas from "./CmpToas";
import FormProduct from "./FormProduct"

export default {
	mounted() {			
		this.getData();
		this.$root.$on('dialogConfirmation',(res) => {
			if(res.type == "ProductUpdate") this.update(res.data);
			if(res.type == "ProductDelete") this.destroy(res.data);
		});
		this.$root.$on('getProducts',() => this.getData());
	},
	components: {	
		CmpConfirmation,
		CmpToas,
		FormProduct
	},
	data: () => ({
		selection: 1,
		search: '',
		headers: [{
				text: '#',
				align: 'start',
				sortable: false,
				value: 'id',
			},
			{ text: 'Name', value: 'name' },
			{ text: 'Description', value: 'description' },
			{ text: 'Price ($)', value: 'price' },
			{ text: 'Picture', value: 'picture' },
			{ text: 'Status', value: 'status' },
			{ text: 'Actions', value: 'actions', sortable: false  },
		],
		rows: [],
	}),
	methods: {
		getData(){
			ProductService.getAll()
			.then(response => {
				this.rows = response.data;
			});
		},
		getColor(row){
			return (row)? 'green' : 'red';
		},
		getUrl(row){
			return (row.length > 0)? row[0]['original_url'] : 'https://cdn.vuetifyjs.com/images/cards/cooking.png';
		},
		create(){			
			this.$emit('formProductShow', true);
		},		
		store(row){
			ProductService.store(row)
			.then(response => {
				console.log(response);					
			});			
		},		
		editStatus(row) {
			let message = "¿Are you sure to updated the status ?"
			this.$emit('confirmationShow', {type: 'ProductUpdate', message: message, data: { id: row.id, params: { status: !row.status }}});
		},
		edit(row) {
			this.$emit('formProductEdit', row.slug);
		},
		update(row){
			ProductService.update(row.id, row.params)
			.then(response => {
				this.getData();
				this.$emit('snackbarShow', response);
			});
		},
		deleting(row) {
			let message = "¿Are you sure to deleted the product?"
			this.$emit('confirmationShow', {type: 'ProductDelete', message: message, data: { id: row.id }});
		},
		destroy(row){
			ProductService.delete(row.id)
			.then(response => {
				this.getData();
				this.$emit('snackbarShow', response);
			});
		}				
	}
}
</script>
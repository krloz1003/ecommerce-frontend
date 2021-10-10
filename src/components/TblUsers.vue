<template>
<v-row dense>	
	<v-col cols="12">
		<v-card>
			<v-card-title>
				<v-btn tile color="success" @click="$emit('formUserShow', true)">
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
			<template v-slot:item.created_at="{ item }">
				{{ getFormatDate(item) }}
			</template>
			<template v-slot:item.actions="{ item }">
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
		<form-user />
	</v-col>
</v-row>
</template>
<script>
import moment from 'moment'

import UserService from "../services/UserService";

import CmpConfirmation from "./CmpConfirmation";
import CmpToas from "./CmpToas";
import FormUser from "./FormUser"

export default {
	mounted() {			
		this.getData();
		this.$root.$on('dialogConfirmation',(res) => {
			if(res.type == "UPDATE") this.update(res.data);
			if(res.type == "DELETE") this.destroy(res.data);
		});
		this.$root.$on('getUsers',() => this.getData());
	},
	components: {	
		CmpConfirmation,
		CmpToas,
		FormUser
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
			{ text: 'E-mail', value: 'email' },
			{ text: 'Created', value: 'created_at' },
			{ text: 'Actions', value: 'actions', sortable: false  },
		],
		rows: [],
	}),
	methods: {
		getData(){
			UserService.getAll()
			.then(response => {
				this.rows = response.data;
			});
		},
		getColor(row){
			return (row)? 'green' : 'red';
		},
		getFormatDate(date, format = 'MMMM Do YYYY, h:mm:ss a'){
			return moment(date).format(format)
		},		
		edit(row) {
			this.$emit('formUserEdit', row.id);
		},
		deleting(row) {
			let message = "¿Are you sure to deleted the product?"
			this.$emit('confirmationShow', {type: 'DELETE', message: message, data: { id: row.id }});
		},
		destroy(row){
			UserService.delete(row.id)
			.then(response => {
				this.getData();
				this.$emit('snackbarShow', response);
			});
		}				
	}
}
</script>
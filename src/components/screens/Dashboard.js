import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import { getOpenIssuesByProject } from '../../services/IssueService.js';
import Loader from '../Loader.js';

const fetchOpenTickets = async (projectId) => {
	await getOpenIssuesByProject(projectId)
}

export default function Dashboard() {

	let [openTickets, setOpenTickets] = useState();
	let [error, setError] = useState();
	let [loading, setLoading] = useState(true);

	fetchOpenTickets(6)
		.then(res => {
			setLoading(false);
			setOpenTickets(res.data);
		})
		.catch(err => {
			setLoading(false);
			setError("Houve um problema ao recuparar os dados.");
		})



	return (
		<div>
			{loading ? (<Loader />) : (
				<Card>
					<Card.Body>
						<Card.Title>Tickets abertos</Card.Title>
						<Card.Text>{console.log(openTickets)}</Card.Text>
					</Card.Body>
				</Card>
			)}

		</div>
	)
}
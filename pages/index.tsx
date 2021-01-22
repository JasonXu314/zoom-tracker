import { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import styles from '../sass/Index.module.scss';

const Index: NextPage = () => {
	const [meetings, setMeetings] = useState<Meeting[]>([]);
	const [name, setName] = useState<string>('');
	const [hour, setHour] = useState<number>(10);
	const [minute, setMinute] = useState<number>(0);
	const [link, setLink] = useState<string>('');
	const [ampm, setAmpm] = useState<AMPM>('AM');

	useEffect(() => {
		setMeetings(JSON.parse(localStorage.getItem('zoom-tracker:meetings') || '[]') as Meeting[]);
	}, []);

	useEffect(() => {
		localStorage.setItem('zoom-tracker:meetings', JSON.stringify(meetings));
	}, [meetings]);

	return (
		<div className={styles.main}>
			<Head>
				<title>Zoom Tracker</title>
			</Head>
			<div>
				<h4>Meeting Name:</h4>
				<input type="text" value={name} onChange={(evt) => setName(evt.target.value)} />
				<h4>Time:</h4>
				<div className={styles.row}>
					<select onChange={(evt) => setHour(parseInt(evt.target.value))} value={hour}>
						{new Array(12).fill(null).map((_, i) => (
							<option value={i + 1} key={i}>
								{i + 1}
							</option>
						))}
					</select>
					:
					<select onChange={(evt) => setMinute(parseInt(evt.target.value))} value={minute}>
						{new Array(61).fill(null).map((_, i) => (
							<option value={i} key={i}>
								{i.toString().length < 2 ? '0' + i : i}
							</option>
						))}
					</select>
					<select onChange={(evt) => setAmpm(evt.target.value as AMPM)}>
						<option value="AM">AM</option>
						<option value="PM">PM</option>
					</select>
				</div>
				<h4>Link:</h4>
				<input type="text" onChange={(evt) => setLink(evt.target.value)} value={link} />
				<br />
				<button
					onClick={() => {
						setName('');
						setHour(10);
						setMinute(0);
						setLink('');
						setAmpm('AM');
						setMeetings([...meetings, { name, time: { hour, minute, ampm }, link }]);
					}}>
					Add
				</button>
			</div>
			<div className={styles.list}>
				{meetings.map((meeting, i) => (
					<div className={styles.meeting} key={i}>
						<h4>{meeting.name}</h4>
						<a href={meeting.link} rel="noopener noreferrer" target="_blank">
							{meeting.link}
						</a>
						<div>
							{meeting.time.hour}:{meeting.time.minute.toString().length < 2 ? '0' + meeting.time.minute : meeting.time.minute}{' '}
							{meeting.time.ampm}
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Index;

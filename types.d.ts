type AMPM = 'AM' | 'PM';

interface Meeting {
	name: string;
	time: {
		hour: number;
		minute: number;
		ampm: AMPM;
	};
	link: string;
}

import { readable } from 'svelte/store';

const DAY3_URL = 'https://advent.sveltesociety.dev/data/2023/day-four.json';

type HeartRate = {
	heartRate: string;
};

type HeartRateError = {
	statusCode: number;
	heartRate: string;
};

const getData = async (): Promise<HeartRate | HeartRateError> => {
	try {
		const response = await fetch(DAY3_URL);
		const heartRate = await response.json();
		return heartRate;
	} catch (err) {
		return {
			statusCode: 500,
			heartRate: 'Internal Server Error'
		};
	}
};

export const heartRateStream = readable(
	{
		stream: getData
	},
	(set) => {
		const interval = setInterval(() => {
			set({
				stream: getData
			});
		}, 1000);

		return () => {
			console.log('unsubscribing');
			clearInterval(interval);
		};
	}
);

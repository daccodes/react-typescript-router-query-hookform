import React, { useEffect, useState } from "react";

const Loading = () => {
	const [points, setPoints] = useState<Array<string>>([""]);

	useEffect(() => {
		const addPoint = setInterval(() => {
			setPoints([...points, ""]);
		}, 500);

		if (points.length > 4) {
			setPoints([""]);
		}
		return () => {
			clearInterval(addPoint);
		};
	}, [points]);

	return (
		<div className="flex items-center justify-center space-x-2">
			{points?.map((point: string, i: number) => (
				<div
					key={i}
					className={`w-2 h-2 rounded-full animate-pulse text-transparent ${
						i == 0 ? `bg-transparent` : `bg-blue-600`
					} `}
				>
					{point}
				</div>
			))}
		</div>
	);
};

export default Loading;

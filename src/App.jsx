import { useState } from 'react';
import './App.css'

function App() {
	const [list, setList] = useState([]);
	const [undo, setUndo] = useState([]);

	const handleClick = (event) => {
		const newDot = {
			clientX: event.clientX,
			clientY: event.clientY
		}
		setList((prev) => [...prev, newDot]);
		setUndo([]);
	};

	const handleUndo = (event) => {
		event.stopPropagation();

		if (list.length === 0) {
			return;
		}

		const lastItem = list[list.length - 1];
		setUndo((prev) => [...prev, lastItem]);

		setList((prev) => {
			const newArr = [...prev].slice(0, -1);
			return newArr;
		});
	};

	const handleRedo = (event) => {
		event.stopPropagation();

		if (undo.length === 0) {
			return;
		}

		const recoveredDot = undo[undo.length - 1];
		setUndo((prev) => {
			const newArr = [...prev].slice(0, -1);
			return newArr;
		});

		setList((prev) => [...prev, recoveredDot]);
	};

	return (
		<div id="page" onClick={handleClick}>
			<button onClick={handleUndo} disabled={list.length === 0}>Desfazer</button>
			<button onClick={handleRedo} disabled={undo.length === 0}>Refazer</button>
			{list.map((item, index) =>
				<span className='dot'
					key={index}
					style={{ left: item.clientX, top: item.clientY }}
				/>)}
		</div>
	)
}

export default App

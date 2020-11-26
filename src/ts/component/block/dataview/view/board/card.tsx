import * as React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { I } from 'ts/lib';
import { observer } from 'mobx-react';
import Cell from 'ts/component/block/dataview/cell';

interface Props extends I.ViewComponent {
	column: number;
	index: number;
	idx: number;
	data: any;
};

const getItemStyle = (snapshot: any, style: any) => {
	if (snapshot.isDragging) {
		style.background = '#f3f2ef';
	};
	return style;
};

@observer
class Card extends React.Component<Props, {}> {

	render () {
		const { rootId, block, readOnly, column, idx, index, data, getView } = this.props;
		const view = getView();
		const relations = view.relations.filter((it: any) => { return it.isVisible; });

		return (
			<Draggable draggableId={[ column, index ].join(' ')} index={idx} type="row">
				{(provided: any, snapshot: any) => (
					<div 
						className="card"
						ref={provided.innerRef}
						{...provided.draggableProps}
						{...provided.dragHandleProps}
						style={getItemStyle(snapshot, provided.draggableProps.style)}
					>
						{relations.map((relation: any, i: number) => (
							<Cell 
								key={'board-cell-' + relation.key} 
								{...this.props}
								id={String(index)} 
								viewType={I.ViewType.Board}
								relation={...relation} 
							/>
						))}
					</div>
				)}
			</Draggable>
		);
	};

};

export default Card;
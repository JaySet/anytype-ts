import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc';
import { Icon, Switch } from 'ts/component';
import { I, C, DataUtil } from 'ts/lib';
import { commonStore, blockStore, dbStore } from 'ts/store';
import { observer } from 'mobx-react';
import arrayMove from 'array-move';

interface Props extends I.Menu {};

const $ = require('jquery');

@observer
class MenuRelationList extends React.Component<Props, {}> {
	
	constructor (props: any) {
		super(props);
		
		this.onAdd = this.onAdd.bind(this);
		this.onEdit = this.onEdit.bind(this);
		this.onSortEnd = this.onSortEnd.bind(this);
		this.onSwitch = this.onSwitch.bind(this);
	};
	
	render () {
		const { param } = this.props;
		const { data } = param;
		const { readOnly, rootId, blockId, getView } = data;
		const view = getView();
		const { relations } = view;
		const block = blockStore.getLeaf(rootId, blockId);

		const Handle = SortableHandle(() => (
			<Icon className="dnd" />
		));
		
		const Item = SortableElement((item: any) => {
			return (
				<div id={'relation-' + item.id} className="item">
					<Handle />
					<span className="clickable" onClick={(e: any) => { this.onEdit(e, item.id); }}>
						<Icon className={'relation c-' + DataUtil.relationClass(item.format)} />
						<div className="name">{item.name}</div>
					</span>
					<Switch value={item.isVisible} className="green" onChange={(e: any, v: boolean) => { this.onSwitch(e, item.id, v); }} />
				</div>
			);
		});
		
		const ItemAdd = SortableElement((item: any) => (
			<div id="relation-add" className="item add" onClick={this.onAdd}>
				<Icon className="dnd" />
				<Icon className="plus" />
				<div className="name">New relation</div>
			</div>
		));
		
		const List = SortableContainer((item: any) => {
			return (
				<div className="items">
					{relations.map((item: any, i: number) => {
						return item ? <Item key={item.key} {...item} id={item.key} index={i} /> : null;
					})}
					{!readOnly ? <ItemAdd index={view.relations.length + 1} disabled={true} /> : ''}
				</div>
			);
		});
		
		return (
			<List 
				axis="y" 
				lockAxis="y"
				lockToContainerEdges={true}
				transitionDuration={150}
				distance={10}
				onSortEnd={this.onSortEnd}
				useDragHandle={true}
				helperClass="isDragging"
				helperContainer={() => { return $(ReactDOM.findDOMNode(this)).get(0); }}
			/>
		);
	};
	
	componentDidUpdate () {
		this.props.position();
	};

	onAdd (e: any) {
		const { param } = this.props;
		const { data } = param;
		
		commonStore.menuOpen('dataviewRelationEdit', { 
			type: I.MenuType.Vertical,
			element: '#relation-add',
			offsetX: 8,
			offsetY: 4,
			vertical: I.MenuDirection.Bottom,
			horizontal: I.MenuDirection.Left,
			data: data
		});
	};
	
	onEdit (e: any, id: string) {
		const { param } = this.props;
		const { data } = param;
		const { readOnly } = data;

		if (readOnly) {
			return;
		};
		
		commonStore.menuOpen('dataviewRelationEdit', { 
			type: I.MenuType.Vertical,
			element: '#relation-' + id,
			offsetX: 0,
			offsetY: 4,
			vertical: I.MenuDirection.Bottom,
			horizontal: I.MenuDirection.Center,
			data: {
				...data,
				relationKey: id,
			}
		});
	};
	
	onSortEnd (result: any) {
		const { oldIndex, newIndex } = result;
		const { param } = this.props;
		const { data } = param;
		const { getView } = data;
		const view = getView();
		
		view.relations = arrayMove(view.relations, oldIndex, newIndex);
		this.save();
	};

	onSwitch (e: any, id: string, v: boolean) {
		const { param } = this.props;
		const { data } = param;
		const { getView } = data;
		const view = getView();

		const relation = view.relations.find((it: any) => { return it.key == id; });
		if (relation) {
			relation.isVisible = v;
			this.save();
		};
	};

	save () {
		const { param } = this.props;
		const { data } = param;
		const { rootId, blockId, onSave, getView } = data;
		const view = getView();

		C.BlockDataviewViewUpdate(rootId, blockId, view.id, view, onSave);
	};
	
};

export default MenuRelationList;
import { Mapper, Decode } from 'ts/lib';

const DebugSync = (response: any) => {
	return response.toObject();
};

const Export = (response: any) => {
	return {
		path: response.getPath(),
	};
};

const FileListOffload = (response: any) => {
	return {
		files: response.getFilesoffloaded(),
		bytes: response.getBytesoffloaded(),
	};
};

const LinkPreview = (response: any) => {
	return {
		previewLink: response.hasLinkpreview() ? Mapper.From.PreviewLink(response.getLinkpreview()) : {},
	};
};

const FileUpload = (response: any) => {
	return {
		hash: response.getHash(),
	};
};

const FileDownload = (response: any) => {
	return {
		path: response.getLocalpath(),
	};
};

const WalletCreate = (response: any) => {
	return {
		mnemonic: response.getMnemonic(),
	};
};

const WalletConvert = (response: any) => {
	return {
		mnemonic: response.getMnemonic(),
		entropy: response.getEntropy(),
	};
};

const AccountCreate = (response: any) => {
	return {
		account: Mapper.From.Account(response.getAccount()),
	};
};

const AccountSelect = (response: any) => {
	return {
		account: Mapper.From.Account(response.getAccount()),
	};
};

const AccountDelete = (response: any) => {
	return {
		status: response.hasStatus() ? Mapper.From.AccountStatus(response.getStatus()) : null,
	};
};

const ObjectCreate = (response: any) => {
	return {
		pageId: response.getPageid(),
	};
};

const ObjectCreateSet = (response: any) => {
	return {
		id: response.getId(),
	};
};

const ObjectCreateBookmark = (response: any) => {
	return {
		pageId: response.getPageid(),
	};
};

const NavigationGetObjectInfoWithLinks = (response: any) => {
	const object = response.getObject();
	const links = object.getLinks();

	return {
		object: {
			id: object.getId(),
			info: Mapper.From.ObjectInfo(object.getInfo()),
			links: {
				inbound: (links.getInboundList() || []).map(Mapper.From.ObjectInfo),
				outbound: (links.getOutboundList() || []).map(Mapper.From.ObjectInfo),
			},
		},
	};
};

const ObjectOpenBreadcrumbs = (response: any) => {
	return {
		objectId: response.getObjectid(),
	};
};

const BlockCreate = (response: any) => {
	return {
		blockId: response.getBlockid(),
	};
};

const BlockLinkCreateWithObject = (response: any) => {
	return {
		blockId: response.getBlockid(),
		targetId: response.getTargetid(),
	};
};

const BlockSplit = (response: any) => {
	return {
		blockId: response.getBlockid(),
	};
};

const BlockBookmarkCreateAndFetch = (response: any) => {
	return {
		blockId: response.getBlockid(),
	};
};

const BlockFileCreateAndUpload = (response: any) => {
	return {
		blockId: response.getBlockid(),
	};
};

const BlockCopy = (response: any) => {
	return {
		textSlot: response.getTextslot(),
		htmlSlot: response.getHtmlslot(),
		anySlot: response.getAnyslotList(),
	};
};

const BlockCut = (response: any) => {
	return {
		textSlot: response.getTextslot(),
		htmlSlot: response.getHtmlslot(),
		anySlot: response.getAnyslotList(),
	};
};

const BlockPaste = (response: any) => {
	return {
		blockIds: response.getBlockidsList(),
		caretPosition: response.getCaretposition(),
		isSameBlockCaret: response.getIssameblockcaret(),
	};
};

const ObjectImportMarkdown = (response: any) => {
	return {
		rootLinkIds: response.getRootlinkidsList(),
	};
};

const BlockListDuplicate = (response: any) => {
	return {
		blockIds: response.getBlockidsList(),
	};
};

const BlockListConvertToObjects = (response: any) => {
	return {
		linkIds: response.getLinkidsList(),
	};
};

const BlockDataviewViewCreate = (response: any) => {
	return {
		viewId: response.getViewid(),
	};
};

const BlockDataviewRecordCreate = (response: any) => {
	return {
		record: Mapper.From.Record(response.getRecord()),
	};
};

const BlockDataviewRelationListAvailable = (response: any) => {
	return {
	};
};

const BlockDataviewRecordRelationOptionAdd = (response: any) => {
	return {
		option: Mapper.From.SelectOption(response.getOption()),
	};
};

const HistoryGetVersions = (response: any) => {
	return {
		versions: (response.getVersionsList() || []).map(Mapper.From.HistoryVersion),
	};
};

const HistoryShowVersion = (response: any) => {
	const version = response.getVersion();
	return {
		version: version ? Mapper.From.HistoryVersion(response.getVersion()) : null,
		objectShow: onObjectShow(response.getObjectshow()),
	};
};

const ObjectTypeList = (response: any) => {
	return {
		objectTypes: (response.getObjecttypesList() || []).map(Mapper.From.ObjectType),
	};
};

const ObjectTypeCreate = (response: any) => {
	return {
		objectType: Decode.decodeStruct(response.getNewdetails()),
	};
};
 
const ObjectSearch = (response: any) => {
	return {
		records: (response.getRecordsList() || []).map(Decode.decodeStruct),
	};
};

const ObjectRelationSearchDistinct = (response: any) => {
	return {
		groups: (response.getGroupsList() || []).map(Mapper.From.BoardGroup),
	};
};

const ObjectSearchSubscribe = (response: any) => {
	const counters = response.getCounters();
	return {
		counters: {
			total: counters.getTotal(),
			nextCount: counters.getNextcount(),
			prevCount: counters.getPrevcount(),
		},
		records: (response.getRecordsList() || []).map(Decode.decodeStruct),
		dependencies: (response.getDependenciesList() || []).map(Decode.decodeStruct),
	};
};

const ObjectSubscribeIds = (response: any) => {
	return {
		records: (response.getRecordsList() || []).map(Decode.decodeStruct),
		dependencies: (response.getDependenciesList() || []).map(Decode.decodeStruct),
	};
};

const ObjectGraph = (response: any) => {
	return {
		edges: (response.getEdgesList() || []).map(Mapper.From.GraphEdge),
		nodes: (response.getNodesList() || []).map(Decode.decodeStruct),
	};
};

const ObjectRelationOptionAdd = (response: any) => {
	return {
		option: Mapper.From.SelectOption(response.getOption()),
	};
};

const ObjectToSet = (response: any) => {
	return {
		id: response.getSetid(),
	};
};

const ObjectToBookmark = (response: any) => {
	return {
		objectId: response.getObjectid(),
	};
};

const ObjectShareByLink = (response: any) => {
	return {
		link: response.getLink(),
	};
};

const ObjectListDuplicate = (response: any) => {
	return {
		ids: response.getIdsList(),
	};
};

const TemplateCreateFromObject = (response: any) => {
	return {
		id: response.getId(),
	};
};

const TemplateCreateFromObjectType = (response: any) => {
	return {
		id: response.getId(),
	};
};

const TemplateClone = (response: any) => {
	return {
		id: response.getId(),
	};
};

const WorkspaceCreate = (response: any) => {
	return {
		id: response.getWorkspaceid(),
	};
};

const UnsplashSearch = (response: any) => {
	return {
		pictures: (response.getPicturesList() || []).map(Mapper.From.UnsplashPicture),
	};
};

const UnsplashDownload = (response: any) => {
	return {
		hash: response.getHash(),
	};
};

const onObjectShow = (response: any) => {
	return {
		rootId: response.getRootid(),
		blocks: (response.getBlocksList() || []).map(Mapper.From.Block),
		details: (response.getDetailsList() || []).map(Mapper.From.Details),
		objectTypes: (response.getObjecttypesList() || []).map(Mapper.From.ObjectType),
		relationLinks: (response.getRelationlinksList() || []).map(Mapper.From.RelationLink),
		restrictions: Mapper.From.Restrictions(response.getRestrictions()),
	};
};

export {
	DebugSync,

	Export,
	FileUpload,
	FileDownload,
	LinkPreview,
	FileListOffload,

	WalletCreate,
	WalletConvert,

	AccountCreate,
	AccountSelect,
	AccountDelete,

	ObjectCreate,
	ObjectCreateSet,
	ObjectCreateBookmark,

	NavigationGetObjectInfoWithLinks,

	ObjectOpenBreadcrumbs,
	
	BlockSplit,
	BlockCopy,
	BlockCut,
	BlockPaste,

	BlockFileCreateAndUpload,
	BlockBookmarkCreateAndFetch,
	BlockLinkCreateWithObject,
	
	ObjectImportMarkdown,

	BlockCreate,
	BlockDataviewViewCreate,

	BlockDataviewRecordCreate,
	BlockDataviewRelationListAvailable,
	BlockDataviewRecordRelationOptionAdd,

	BlockListDuplicate,
	BlockListConvertToObjects,

	HistoryGetVersions,
	HistoryShowVersion,

	ObjectTypeList,
	ObjectTypeCreate,

	ObjectSearch,
	ObjectRelationSearchDistinct,
	ObjectSearchSubscribe,
	ObjectSubscribeIds,
	ObjectGraph,
	ObjectRelationOptionAdd,
	ObjectShareByLink,

	ObjectToSet,
	ObjectToBookmark,

	ObjectListDuplicate,

	TemplateCreateFromObject,
	TemplateCreateFromObjectType,
	TemplateClone,

	WorkspaceCreate,

	UnsplashSearch,
	UnsplashDownload,

	onObjectShow,
};

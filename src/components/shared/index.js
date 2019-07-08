/**
 * Wrapper for components shared
 */
import BaseComponent from './BaseComponent'
import ProfileDropdown from './ProfileDropdown'
import Logo from './Logo'
import Icon from './Icon'
import Arrow from './Arrow'
import AutoComplete from './Autocomplete'
import Button from './Button'
import ButtonLink from './ButtonLink'
import Checkbox from './Checkbox'
import ConfirmationDialog from './ConfirmationDialog'
import Dialog from './Dialog'
import Paginator from './Paginator'
import Paper from './Paper'
import SearchInput from './SearchInput'
import SocialIcon from './SocialIcon'
import SocialList from './SocialList'
import Spinner from './Spinner'
import StatusIcon from './StatusIcon'
import SvgIcon from './SvgIcon'
import Typography from './Typography'
import {
	VoterCardView,
	VoterInfo,
	VoterAvatar,
	VoterAction,
	VoterActionItem,
	VoterCommunication,
	VoterProfile,
	VoterDetail,
	TitleAndDescription,
	StepProgressBar,
	RightProgressPanel,
	CommentsList
} from './voterComponents'
import {
	SocialInfo,
	VoterNotFound,
	ConnectListInfo,
	VotersProgressBar,
	VotersTable
} from './selectVoters'

import VoterStatusDropdown from './VoterStatusDropdown'
import Tabs from './Tabs';
import { SubTaskItem, TaskCompleteDialog, ActionItem, TaskProgressBar } from './taskComponents'
import { LeftSideMenu, Panel } from './settings'
import {
	EmailInput,
	FirstNameInput,
	LastNameInput,
	PasswordInput,
	TextInput,
	ProfileInformationText,
	ProfileAvatar,
	RadioOption,
	RadioGroup,
	TextArea,
	ProfileAvatarOption,
	DragDropImageUpload
} from './validatedInputs'
import { CongratsAlarm, ErrorAlarm } from './alarmComponents'
import { VoterPerformer, PerformersTable } from './performComponents'
import SwitchButton from './SwitchButton'
import PopoverKeepOnHover from './PopoverKeepOnHover'
import './styles/index.scss';

export {
	BaseComponent,
	ProfileDropdown,
	Logo,
	Icon,
	Arrow,
	AutoComplete,
	Button,
	Checkbox,
	ConfirmationDialog,
	Dialog,
	Paginator,
	Paper,
	SearchInput,
	SocialIcon,
	SocialList,
	Spinner,
	StatusIcon,
	SvgIcon,
	TaskProgressBar,
	Typography,
	VoterAvatar,
	VoterAction,
	VoterActionItem,
	VoterCommunication,
	VoterProfile,
	VotersProgressBar,
	VotersTable,
	VoterInfo,
	VoterCardView,
	VoterDetail,
	VoterStatusDropdown,
	ActionItem,
	Tabs,
	SubTaskItem,
	TaskCompleteDialog,
	TitleAndDescription,
	StepProgressBar,
	RightProgressPanel,
	SocialInfo,
	VoterNotFound,
	ConnectListInfo,
	LeftSideMenu,
	EmailInput,
	FirstNameInput,
	LastNameInput,
	PasswordInput,
	TextInput,
	TextArea,
	ProfileInformationText,
	ProfileAvatar,
	ProfileAvatarOption,
	DragDropImageUpload,
	Panel,
	CongratsAlarm,
	ErrorAlarm,
	VoterPerformer,
	RadioOption,
	RadioGroup,
	PerformersTable,
	CommentsList,
	SwitchButton,
	ButtonLink,
	PopoverKeepOnHover
}

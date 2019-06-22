const Links = [{
	label:'Not registered',
	name: 'not'
}, {
	label:'Infrequent',
	name: 'infrequent'
}, {
	label:'Regular',
	name: 'regular'
}]

export default (isMobile) => {
	return isMobile ? [{ label:'All', name: 'all' }, ...Links] : [{ label:'All voters', name: 'all' }, ...Links]
}
export type FeatureTag = {
	name: string
	description?: string
}

const registeredTags = new Map<string, FeatureTag>()

export const registerFeatureTag = (tag: FeatureTag) => {
	registeredTags.set(tag.name, tag)
	return tag
}

export const listRegisteredTags = () => Array.from(registeredTags.values())

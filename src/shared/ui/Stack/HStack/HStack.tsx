import { Flex, FlexElements, FlexProps } from '../Flex/Flex';

type HStackProps = Omit<FlexProps<FlexElements>, 'direction'>

export const HStack = (props: HStackProps) => (
	<Flex direction={'column'} {...props} />
);

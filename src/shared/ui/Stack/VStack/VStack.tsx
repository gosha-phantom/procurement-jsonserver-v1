import { Flex, FlexProps, FlexElements } from '../Flex/Flex';

type VStackProps = Omit<FlexProps<FlexElements>, 'direction'>

export const VStack = (props: VStackProps) => (
	<Flex direction={'row'} {...props} />
);

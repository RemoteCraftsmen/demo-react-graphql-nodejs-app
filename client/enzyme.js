import Enzyme, { configure, mount, render } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });
export { mount, render };
export default Enzyme;

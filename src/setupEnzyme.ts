import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import chaiEnzyme from 'chai-enzyme'
import chai from 'chai'

Enzyme.configure({ adapter: new Adapter() })
chai.use(chaiEnzyme())

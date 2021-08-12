import { Layout, Row, Col, Card, Button, Input, Table, Badge, Checkbox } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter, faSearch } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';

const dataSource = [
  {
    key: 1,
    stakeholder: 'Mike',
    feedback: 'I need the solution to be able to handle more than 500 users.',
    priority: 3,
    expdate: '7/2/2021',
    addressed: false,
  },
  {
    key: 2,
    stakeholder: 'John',
    feedback: 'There is a bug in auto scaling properties',
    expdate: '9/2/2021',
    priority: 1,
    addressed: false,
  },
  {
    key: 3,
    stakeholder: 'Marie',
    feedback: 'Can you add auto-validation? I like the standart, but it result to be automated',
    expdate: '',
    priority: 2,
    addressed: true,
  },
];

const columns = [
  {
    title: 'Stakeholder',
    dataIndex: 'stakeholder',
    key: 'stakeholder',
    width: '20%',
    sorter: (a, b) => a.stakeholder.localeCompare(b.stakeholder)
  },
  {
    title: 'Feedback',
    dataIndex: 'feedback',
    key: 'feedback',
    sorter: (a, b) => a.feedback.localeCompare(b.feedback)
  },
  {
    title: 'Exp. Date',
    dataIndex: 'expdate',
    width: '10%',
    key: 'expdate',
    sorter: (a, b) => a.expdate.localeCompare(b.expdate)
  },
  {
    title: 'Priority',
    dataIndex: 'priority',
    width: '10%',
    key: 'priority',
    sorter: (a, b) => a.priority - b.priority,
    render: (text, record, index) => {
      if (text === 1) {
        return <Badge color="green" text="Low" />
      }
      if (text === 2) {
        return <Badge color="yellow" text="Medium" />
      }
      if (text === 3) {
        return <Badge color="red" text="High" />
      }
    }
  },
  {
    title: 'Addressed',
    dataIndex: 'addressed',
    align: 'center',
    width: '10%',
    key: 'addressed', sorter: {
      compare: (a, b) => a.addressed - b.addressed,
      multiple: 3,
    },
    render: (text, record, index) => {
      return <Checkbox checked={text}
        onChange={() => {

        }} />
    }
  },
];

function App() {
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [filter, setFilter] = useState('')
  const onSelectChange = selectedRowKeys => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    setSelectedRowKeys(selectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const data = filter ? dataSource.filter(a => {
    const lowerFilter = filter.toLocaleLowerCase()
    const checkPriority = lowerFilter === 'low' || lowerFilter === 'medium' || lowerFilter === 'high'
    for (const b of Object.entries(a)) {
      if (b[1] !== '' && checkPriority) {
        const priorities = ['low', 'medium', 'high']
        const index = priorities.indexOf(lowerFilter) + 1
        if (b[0] === 'priority' && b[1] === index) {
          return a
        }
      } else if (b[1] !== '' && b[1].toString().toLocaleLowerCase().includes(filter)) {
        return a
      }
    }
    return null
  }) : dataSource
  return (
    <Layout className="container-fluid">
      <Row gutter={40} className="topmenu mx-2 my-4">
        <Col span={5}>
          <h3 className="text-muted" style={{ marginTop: -5 }}>
            <img src="/logo.png" alt="log" height="30" style={{ marginTop: 10 }} /> &nbsp; Portal
          </h3>
        </Col>
        <Col> <Button type="text" className="text-muted">Questions</Button> </Col>
        <Col> <Button type="text" className="text-muted">Use Cases</Button> </Col>
        <Col> <Button type="text" className="text-muted">Tasks</Button> </Col>
        <Col> <Button type="text" className="text-muted">Report</Button> </Col>
        <Col> <Button type="text" className="text-muted">Feedback</Button> </Col>
      </Row>
      <Card>
        <Row gutter={20}>
          <Col><Button icon={<FontAwesomeIcon icon={faFilter} />}>&nbsp; Filter</Button></Col>
          <Col span={7}>
            <Input
              onChange={(e) => {
                setFilter(e.target.value)
              }}
              placeholder="Filter Priority, Stakeholder, Type, etc"
              prefix={<FontAwesomeIcon icon={faSearch} />} />
          </Col>
        </Row>
        <br />
        <Row gutter={20}>
          <Col span={24}>
            <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
          </Col>
        </Row>
      </Card>
    </Layout>
  );
}

export default App;

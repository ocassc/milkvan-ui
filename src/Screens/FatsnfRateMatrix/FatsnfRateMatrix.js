import { Button, Col, Form, Input, message, Row, Table } from "antd";
import React, { useContext, useEffect, useRef, useState } from "react";
import axiosInstance from "../../axiosInstance";
import { UserContext } from "../../globalContext";

const EditableContext = React.createContext(null);

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};
const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };

  const save = async (e) => {
    try {
      alert(e.target.value);
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
      >
        <Input ref={inputRef} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 40,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

const FatsnfRateMatrix = ({ onHandleChange }) => {
  const user=useContext(UserContext);
 const[effectiveFrom, setEffectiveFrom]=useState("");
 const[effectiveTo, setEffectiveTo]=useState("");
 const [snf, setSnf]=useState("");
 const [fat, setFat]=useState("");
 const [rate, setRate]= useState("");

 
  const dataObj = [
    {
      key: "0",
      id: "3.1",
      8: "0",
      8.1: "0",
      8.2: "0",
      8.3: "0",
      8.4: "0",
      8.5: "0",
      8.6: "0",
      8.7: "0",
      8.8: "0",
      8.9: "0",
      9: "0",
    },
    {
      key: "1",
      id: "3.2",
      8: "0",
      8.1: "0",
      8.2: "0",
      8.3: "0",
      8.4: "0",
      8.5: "0",
      8.6: "0",
      8.7: "0",
      8.8: "0",
      8.9: "0",
      9: "0",
    },
    {
      key: "2",
      id: "3.3",
      8: "0",
      8.1: "0",
      8.2: "0",
      8.3: "0",
      8.4: "0",
      8.5: "0",
      8.6: "0",
      8.7: "0",
      8.8: "0",
      8.9: "0",
      9: "0",
    },
    {
      key: "3",
      id: "3.4",
      8: "0",
      8.1: "0",
      8.2: "0",
      8.3: "0",
      8.4: "0",
      8.5: "0",
      8.6: "0",
      8.7: "0",
      8.8: "0",
      8.9: "0",
      9: "0",
    },
    {
      key: "4",
      id: "3.5",
      8: "0",
      8.1: "0",
      8.2: "0",
      8.3: "0",
      8.4: "0",
      8.5: "0",
      8.6: "0",
      8.7: "0",
      8.8: "0",
      8.9: "0",
      9: "0",
    },
    {
      key: "5",
      id: "3.6",
      8: "0",
      8.1: "0",
      8.2: "0",
      8.3: "0",
      8.4: "0",
      8.5: "0",
      8.6: "0",
      8.7: "0",
      8.8: "0",
      8.9: "0",
      9: "0",
    },
    {
      key: "6",
      id: "3.7",
      8: "0",
      8.1: "0",
      8.2: "0",
      8.3: "0",
      8.4: "0",
      8.5: "0",
      8.6: "0",
      8.7: "0",
      8.8: "0",
      8.9: "0",
      9: "0",
    },
    {
      key: "7",
      id: "3.8",
      8: "0",
      8.1: "0",
      8.2: "0",
      8.3: "0",
      8.4: "0",
      8.5: "0",
      8.6: "0",
      8.7: "0",
      8.8: "0",
      8.9: "0",
      9: "0",
    },
    {
      key: "8",
      id: "3.9",
      8: "0",
      8.1: "0",
      8.2: "0",
      8.3: "0",
      8.4: "0",
      8.5: "0",
      8.6: "0",
      8.7: "0",
      8.8: "0",
      8.9: "0",
      9: "0",
    },
    {
      key: "9",
      id: "4.0",
      8: "0",
      8.1: "0",
      8.2: "0",
      8.3: "0",
      8.4: "0",
      8.5: "0",
      8.6: "0",
      8.7: "0",
      8.8: "0",
      8.9: "0",
      9: "0",
    },
  ];
  const [dataSource, setDataSource] = useState(dataObj);

  const Columns = [
    {
      title: "FAT/SNF",
      dataIndex: "id",
    },
    {
      title: "8",
      dataIndex: "8",

      editable: true,
    },
    {
      title: "8.1",
      dataIndex: "8.1",
      editable: true,
    },
    {
      title: "8.2",
      dataIndex: "8.2",
      editable: true,
    },
    {
      title: "8.3",
      dataIndex: "8.3",
      editable: true,
    },
    {
      title: "8.4",
      dataIndex: "8.4",
      editable: true,
    },
    {
      title: "8.5",
      dataIndex: "8.5",
      editable: true,
    },
    {
      title: "8.6",
      dataIndex: "8.6",
      editable: true,
    },
    {
      title: "8.7",
      dataIndex: "8.7",
      editable: true,
    },
    {
      title: "8.8",
      dataIndex: "8.8",
      editable: true,
    },
    {
      title: "8.9",
      dataIndex: "8.9",
      editable: true,
    },
    {
      title: "9",
      dataIndex: "9",
      editable: true,
    },
  ];

  useEffect(() => {
    let mounted = true;
    if (mounted) getData();
    return () => (mounted = false);
  }, []);

  const getData = () => {
    axiosInstance.get(`/fatsnfRateMatrix`).then((response) => {
      setDataSource(response.data.data);
    });
  };

  const handleSave = (row) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    setDataSource(newData);
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  const columns = Columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });
  const onHandleSave = () => {
    axiosInstance.post(`/fatsnfRateMatrix`, dataSource).then((res) => {
      if (res.data && res.data.responseCode === -1) {
        message.error("Record Already Exists");
      } else if (res.data && res.data.responseCode === 1) {
        message.success("Record Update successfully");
      } else message.error("Something wrong. Please try again...!");
    });
  };

  const onSave=()=>{
    const data={
      effectiveFrom:effectiveFrom,
      effectiveTo:effectiveTo,
      snf:snf,
      fat:fat,
      rate:rate,
      companyId:1,
      userId:parseInt(user.userId),
    }
    axiosInstance.post(`/fatsnfRateMatrix`, data).then((res) => {
      if (res.data && res.data.responseCode === -1) {
        message.error("Record Already Exists");
      } else if (res.data && res.data.responseCode === 1) {
        message.success("Record Update successfully");
      } else message.error("Something wrong. Please try again...!");
    });
  }
  return (
    <div>
      <h1>FatsnfRateMatrix</h1>
<div>
  <Form>
  <Row gutter={20}>
  <Col span={12}>
            <Form.Item colon={false} label="SNF">
              <Input
                placeholder="SNF"
                value={snf}
                onChange={(e) => setSnf(e.target.value)}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item colon={false} label="FAT">
              <Input
                placeholder="FAT"
                value={fat}
                onChange={(e) => setFat(e.target.value)}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item colon={false} label="Rate">
              <Input
                placeholder="Rate"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item colon={false} label="EffectiveFrom">
              <Input
                placeholder="EffectiveFrom"
                value={effectiveFrom}
                onChange={(e) => setEffectiveFrom(e.target.value)}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item colon={false} label="EffectiveTo">
              <Input
                placeholder="EffectiveTo"
                value={effectiveTo}
                onChange={(e) => setEffectiveTo(e.target.value)}
              />
            </Form.Item>
          </Col>
        
        </Row>
        <Row gutter={20}>
          <Col span={12}>
            <Button type="primary" onClick={onSave}>
              Save
            </Button>
          </Col>
        </Row>
  </Form>
</div>
      <div>
        <Table
          components={components}
          rowClassName={() => "editable-row"}
          bordered
          dataSource={dataSource}
          columns={columns}
        />
      </div>
      <div>
        <Button type="primary" onChange={onHandleSave}>
          Save
        </Button>
      </div>
    </div>
  );
};

export default FatsnfRateMatrix;

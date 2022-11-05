import { Button, message, Row, Col, Input } from "antd";
import React, { useContext, useEffect, useState } from "react";
import axiosInstance from "../../axiosInstance";
import jsonToPivotjson from "json-to-pivot-json";
import unpivotJson from "../../shared/JsonUnpivot";
import { ReactTable } from "../../shared/ReactTable";
import { PageContext } from "./service";
import unpivot from "array-unpivot";
import { UserContext } from "../../globalContext";
const FatsnfRateMatrix = () => {
  const context = useContext(PageContext);
  const user = useContext(UserContext);

  let dataObj = [];
  const [dataSource, setDataSource] = useState(dataObj);

  useEffect(() => {
    let mounted = true;
    if (mounted) getData();
    return () => (mounted = false);
  }, []);


  const getData = () => {
    axiosInstance.get(`/fatsnfRateMatrix/user/1`).then((response) => {
      var options = {
        row: "fat",
        column: "snf",
        value: "rate",
      };

      var output = jsonToPivotjson(response.data.data, options);
      setDataSource(output);
    });
  };

  const getColumns = () => {
    var clist = [
      {
        Header: "Fat/Snf",
        accessor: "fat",
      },
    ];

    var cl = Object.keys(dataSource.length > 0 && dataSource[0]).map((key) => {
      if (key !== "fat") {
        clist.push({
          Header: key,
          accessor: key.toString(),
          Cell: (params) => {
            let datakey = params.row.original.fat + "-" + key;
            return (
              <div>
                {/* <div>{params.row.original[key]}</div> */}
                <Input
                  data-index={datakey}
                  type="text"
                  className="form-control"
                  defaultValue={params.row.original[key]}
                  onChange={(e) =>
                    onRateChange(e, params.row.original.fat, key)
                  }
                />
              </div>
            );
          },
        });

        return {
          Header: key,
          accessor: key,
        };
      }
    });

    return clist;
  };

  const columns = getColumns();
  const onRateChange = (e, f, s) => {
    let tempds = dataSource;
    tempds.find((d) => d.fat === f)[s] = e.target.value;
    setDataSource(tempds);
  };

  const onHandleSave = (value, f, s) => {
    let unPivotData = unpivotJson(dataSource, { column: "fat" });
    console.log("unPivotData");
    console.log(unPivotData);
    axiosInstance
      .put(`/fatsnfRateMatrix/${1}/${parseInt(user.userId)}`, unPivotData)
      .then((res) => {
        if (res.data && res.data.responseCode === -1) {
          message.error("Record Already Exists");
        } else if (res.data && res.data.responseCode === 1) {
          message.success("Record Update successfully");
        } else message.error("Something wrong. Please try again...!");
      });
  };
  return (
    <div>
      <Row>
        <Col span={4}>
          <div>
            <h1>Rate Matrix</h1>
          </div>
        </Col>
      </Row>

      <div>
        <Button type="primary" onClick={onHandleSave}>
          Save
        </Button>
      </div>
      <div>
        <ReactTable
          allowPaging={false}
          context={context}
          columns={columns}
          data={dataSource}
        ></ReactTable>
      </div>
    </div>
  );
};

export default FatsnfRateMatrix;

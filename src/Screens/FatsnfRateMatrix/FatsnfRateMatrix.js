import { Button, Input, message } from "antd";
import React, { useContext, useEffect, useRef, useState } from "react";
import axiosInstance from "../../axiosInstance";
import jsonToPivotjson from "json-to-pivot-json";
import { ReactTable } from "../../shared/ReactTable";
import { PageContext } from "./service";

const FatsnfRateMatrix = () => {
  const context = useContext(PageContext);

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
            return (
              <div>
                <label>{params.row.original[key]}</label>
                <Input
                  initialValue={params.row.original[key]}
                  onChange={(e) => onRate(e, params.row.original.fat, key)}
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
  const onRate = (value, f, s) => {
    let tempds = dataSource;

    dataSource.find((d) => d.fat == f)[s] = value.target.value;
    console.log(tempds);
    setDataSource(dataSource);
   

    //setDataSource()
    // alert(f)
    // alert(s)
    // alert(value.target.value)
  };

  const onHandleSave = () => {
    const data = {
      // effectiveFrom:effectiveFrom,
      // effectiveTo:effectiveTo,
      // snf:snf,
      // fat:fat,
      // rate:rate,
      // companyId:1,
      // userId:parseInt(user.userId),
    };
    axiosInstance.post(`/fatsnfRateMatrix`, data).then((res) => {
      if (res.data && res.data.responseCode === -1) {
        message.error("Record Already Exists");
      } else if (res.data && res.data.responseCode === 1) {
        message.success("Record Update successfully");
      } else message.error("Something wrong. Please try again...!");
    });
  };
  return (
    <div>
      <h1>Fat Snf Rate Matrix</h1>
      <div>
        <ReactTable
          allowPaging={false}
          context={context}
          columns={columns}
          data={dataSource}
        ></ReactTable>
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

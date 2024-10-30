import { Affix, Button, Card, Checkbox, CheckboxProps, Empty, Image, Spin } from "antd";
import { GetProp } from "antd/lib";
import { useEffect, useMemo, useState } from "react";
import { fallBackImg } from "../../../constants/common";
import { convertPriceVND } from "../../../utils/common";

type Props = {
  id?: number;
  showToastMes: any;
}

interface IState {
  loading: boolean;
  data: any;
}

const initState: IState = {
  loading: false,
  data: []
}

export default function ProCartComponent({ id, showToastMes }: Props) {
  const [state, setState] = useState<IState>(initState);
  const [checkedList, setCheckedList] = useState<string[]>([]);
  const indeterminate = useMemo(() => checkedList.length > 0 && checkedList.length < checkedList.length, [checkedList]);
  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      try {
        setState(prev => ({...prev, loading: true}));

      } catch (error) {
        setState(prev => ({...prev, loading: false}));
        console.log(error);
        showToastMes('error', 'Có lỗi xảy ra!')
      }
    }
    fetchData();
  }, [id]);

  const onChange: GetProp<typeof Checkbox.Group, 'onChange'> = (checkedValues: any) => {
    setCheckedList(checkedValues)
  };

  const onCheckAllChange: CheckboxProps['onChange'] = (e) => {
    // setCheckedList();
  };

  if (!id) {
    return <div className="mt-60">
      <Empty description={'Không có dữ liệu.'} />
    </div>
  }

  if (state.loading) {
    return <Spin tip="Đang tải..."><div className="mt-60" /></Spin>
  }

  return (
    <div className="pt-5">
      <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} className="m-2">
        Chọn tất cả
      </Checkbox>
      <Checkbox.Group className="block" onChange={onChange}>
        <Card className="m-2" styles={{ body: { padding: '8px 0', display: 'flex', alignItems: 'center' } }}>
          <Checkbox value="A" className="mx-2"></Checkbox>
          <Image src={fallBackImg} preview={false} width={50} className="rounded" />
          <div className="ml-2 flex flex-col gap-2 justify-between">
            <div className="text-primary text-sm font-semibold">San pham 1</div>
            <div className="text-primary text-sm font-semibold">{convertPriceVND(123456)}</div>
          </div>
          <div className="ml-auto mr-5 font-semibold">x4</div>
        </Card>
        <Card className="m-2" styles={{ body: { padding: '8px 0', display: 'flex', alignItems: 'center' } }}>
          <Checkbox value="B" className="mx-2"></Checkbox>
          <Image src={fallBackImg} preview={false} width={50} className="rounded" />
          <div className="ml-2 flex flex-col gap-2 justify-between">
            <div className="text-primary text-sm font-semibold">San pham 1</div>
            <div className="text-primary text-sm font-semibold">{convertPriceVND(123456)}</div>
          </div>
          <div className="ml-auto mr-5 font-semibold">x4</div>
        </Card>
        <Card className="m-2" styles={{ body: { padding: '8px 0', display: 'flex', alignItems: 'center' } }}>
          <Checkbox value="C" className="mx-2"></Checkbox>
          <Image src={fallBackImg} preview={false} width={50} className="rounded" />
          <div className="ml-2 flex flex-col gap-2 justify-between">
            <div className="text-primary text-sm font-semibold">San pham 1</div>
            <div className="text-primary text-sm font-semibold">{convertPriceVND(123456)}</div>
          </div>
          <div className="ml-auto mr-5 font-semibold">x4</div>
        </Card>
      </Checkbox.Group>

      <Affix offsetBottom={20}>
        <div className="flex justify-center pt-2">
          <Button type="primary" className="mx-2 w-full">Xác nhận</Button>
        </div>
      </Affix>
    </div>
  )
}
import React, { useEffect, useRef, useState } from 'react';
import colors from '../components/colors';
import Navigation from '../components/Navigation';
import axios from 'axios';

const Cashier = ({ keyboardVisible, setKeyboardVisible, token, setItems, setTotal, total, items }) => {
  const [stock, setStock] = useState([])
  const [updated, setUpdated] = useState(false)
  const amountReft = useRef(null)

  const getStock = async () => {
    const query = `
        query{
            stocks(pagination:{start:0, limit: 99999}){
              data{
                id
                attributes{
                  namaBarang
                  harga
                }
              }
            }
          }
        `
    try {
      const resp = await axios.post('http://localhost:1337/graphql', {
        query: query
      })
      setStock(resp.data.data.stocks.data)

    } catch (error) {
      console.log(error)
    }
  }


  const [searchVal, setSearchVal] = useState("")

  const searchByNamaBarang = async () => {
    if (searchVal === "") {
      setUpdated(!updated)
    }
    const query = `query{
      stocks(pagination:{start:0, limit: 99999}, filters:{namaBarang:{containsi:"${searchVal}"}}){
        data{
          id
          attributes{
            namaBarang
            harga
          }
        }
      }
    }`
    try {
      const resp = await axios.post('http://localhost:1337/graphql', {
        query: query
      })
      setStock(resp.data.data.stocks.data)
    } catch (error) {
      console.log(error)
    }
  }

  function formatRupiah(angka) {
    var number_string = angka.toString(),
      split = number_string.split(','),
      sisa = split[0].length % 3,
      rupiah = split[0].substr(0, sisa),
      ribuan = split[0].substr(sisa).match(/\d{1,3}/gi);

    // tambahkan titik jika yang diambil adalah ribuan
    if (ribuan) {
      let separator = sisa ? '.' : '';
      rupiah += separator + ribuan.join('.');
    }

    // format desimal
    rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;

    return 'Rp. ' + rupiah;
  }

  const [range, setRange] = useState(1)
  const [namaBarang, setNamaBarang] = useState('')
  const [harga, setHarga] = useState(0)
  

  const amountClick = (id) => {
    amountReft.current.style.top = "0%"
    const filteredStock = stock.find(item => item.id === id);
    setNamaBarang(filteredStock.attributes.namaBarang)
    setHarga(filteredStock.attributes.harga)
  }

  const amountVal = () => {
    items.push({ namaBarang: namaBarang, harga: harga, amount: range, jumlah: harga * range })
    amountReft.current.style.top = '-100%'
    const resultList = items.map(item => item.harga * item.amount);
    const totalItems = resultList.reduce((acc, current) => acc + current, 0);
    console.log(items)
    setTotal(totalItems)
    console.log(total)
    setTimeout(() => {
      setHarga(0)
      setNamaBarang("")
      setRange(1)
    }, 50)
  }

  useEffect(() => {
    getStock()
  }, [updated])
  return (
    <div>
      <Navigation keyboardVisible={keyboardVisible} setKeyboardVisible={setKeyboardVisible} active3={colors.black} />

      <div className='w-100 container d-flex justify-content-center align-items-center flex-column py-5'>
        <h1 className='mb-2'>Cashier</h1>
        <input type="text" className='form-control form-control-sm my-3' placeholder='cari nama produk' onChange={(e) => {
          setSearchVal(e.target.value)
          searchByNamaBarang()
        }} onFocus={() => setKeyboardVisible(true)} onBlur={() => setKeyboardVisible(false)} />
        <div className='w-100 overflow-x-auto' style={{
          maxHeight: "65vh"
        }}>
          <div className="row w-100 m-auto">
            {stock.map(item => {
              const rupiah = formatRupiah(item.attributes.harga)
              return (
                <div className="col col-6 p-1" key={item.id} onClick={() => amountClick(item.id)}>
                  <div className='card container w-100 d-flex justify-content-center align-items-center py-2 flex-column' style={{
                    backgroundColor: colors.grey
                  }}>
                    <p className='mb-0 w-100 text-black text-center text-wrap text-capitalize' style={{
                      fontSize: "13px"
                    }}>{item.attributes.namaBarang}</p>
                    <p className='mb-0 w-100 text-black text-center text-wrap text-capitalize' style={{
                      fontSize: "13px"
                    }}>{rupiah}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <button className='btn btn-success w-100 mt-2'>Lihat Nota</button>
        <div className='w-100 vh-100 position-fixed z-3 d-flex justify-content-center align-items-center' style={{
          backgroundColor: "rgba(0,0,0,0.4)",
          top: "-100%",
          transition: "all .3s"
        }} ref={amountReft}>
          <div className='bg-dark w-50 py-4 rounded-4 d-flex justify-content-center align-items-center flex-column position-relative'>
            <i className="fa-solid fa-circle-xmark position-absolute fs-5" style={{
              top: 10,
              right: 10
            }} onClick={() => {
              amountReft.current.style.top = "-100%"
              setHarga(0)
              setNamaBarang("")
              setAmount(1)
              setRange(1)
            }}></i>
            <h3 className='mb-5'>{namaBarang}</h3>
            <div className='container w-100 d-flex justify-content-between align-items-center'>
              <input type="range" min={1} max={1000} value={range} onChange={(e) => setRange(e.target.value)} step={1} className='form-range w-75 pe-3' />
              <input type="number" value={range} onChange={(e) => setRange(e.target.value)} className='form-control w-25' />
            </div>
            <button className='btn btn-success mt-3' onClick={() => amountVal()}>Confirm</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cashier;
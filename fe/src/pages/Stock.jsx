import React, { useEffect, useRef, useState } from 'react';
import colors from '../components/colors';
import Navigation from '../components/Navigation';
import axios from 'axios';
import AlertSucces from '../components/AlertSucces';
import AlertFailed from '../components/AlertFailed';

const Stock = ({ keyboardVisible, setKeyboardVisible, token }) => {
  const [stockData, setStockData] = useState([])
  const [page, setPage] = useState([])
  const [updated, setUpdated] = useState(false)
  const [searchVal, setSearchVal] = useState("")
  const succesRef = useRef(null)
  const failedRef = useRef(null)

  const getData = async () => {
    try {
      const resp = await axios.get('http://localhost:1337/api/stocks')
      if (resp.status === 200) {
        setStockData(resp.data.data)
        setPage([resp.data.meta])
      }
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

  let [pageCount, setPageCount] = useState(1)

  const nextPage = async () => {
    setPageCount(pageCount += 1)
    if (pageCount >= page[0].pagination.pageCount) {
      setPageCount(0)
    }
    try {
      const resp = await axios.get(`http://localhost:1337/api/stocks?pagination[page]=${pageCount}`)
      if (resp.status === 200) {
        setStockData(resp.data.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const prevPage = async () => {
    if (pageCount <= 1) {
      setPageCount(page[0].pagination.pageCount)

    } else {
      setPageCount(pageCount -= 1)
    }

    try {
      const resp = await axios.get(`http://localhost:1337/api/stocks?pagination[page]=${pageCount}`)
      if (resp.status === 200) {
        setStockData(resp.data.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const validateSearch = async () => {
    if (searchVal === "") {
      setPage(page)
    }
    try {
      const resp = await axios.get(`http://localhost:1337/api/stocks?filters[namaBarang][$containsi]=${searchVal}`)
      if (resp.status === 200) {
        setStockData(resp.data.data)
        setPage([resp.data.meta])
      }
    } catch (error) {
      console.log(error)
    }
  }

  const paginationClick = async (i) => {
    try {
      setPageCount(i)
      const resp = await axios.get(`http://localhost:1337/api/stocks?pagination[page]=${pageCount}`)
      if (resp.status === 200) {
        setStockData(resp.data.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const [namaBarang, setNamaBarang] = useState("")
  const [harga, setHarga] = useState(0)
  const [jumlah, setJumlah] = useState(0)
  const updateFormRef = useRef(null)
  const deleteFormRef = useRef(null)
  const deleteRef = useRef(null)
  const [isArray, setIsArray] = useState(false)
  const [id, setId] = useState(0)

  const updateClick = (id) => {
    setIsArray(true)
    updateFormRef.current.style.top = "0%"
    const filteredStock = stockData.find(item => item.id === id);
    setId(id)
    setNamaBarang(filteredStock.attributes.namaBarang)
    setHarga(filteredStock.attributes.harga)
    setJumlah(filteredStock.attributes.jumlah)
  }

  const updateValidate = async (e, id) => {
    e.preventDefault()
    const data = {
      data: {
        namaBarang: namaBarang,
        harga: harga,
        jumlah: jumlah
      }
    }
    try {
      const resp = await axios.put(`http://localhost:1337/api/stocks/${id}`, data, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
      })

      if (resp.status === 200) {
        setUpdated(!updated)
        succesRef.current.className = "w-75 d-block"
        updateFormRef.current.style.top = '-100%'
        setTimeout(() => {
          succesRef.current.style.right = "2%"
        }, 100)
        setTimeout(() => {
          succesRef.current.style.right = "-100%"
          setTimeout(() => {
            succesRef.current.className = "w-75 d-none"
          }, 300)
        }, 1500);
      }
    } catch (error) {
      console.log(error)
      updateFormRef.current.style.top = '-100%'
      failedRef.current.className = "w-75 d-block"
      setTimeout(() => {
        failedRef.current.style.right = "2%"
      }, 100);
      setTimeout(() => {
        failedRef.current.style.right = "-100%"
        setTimeout(() => {
          failedRef.current.className = "w-75 d-none"
        }, 300)
      }, 2000)
    }
  }

  const delClick = (id) => {
    deleteFormRef.current.className = "w-100 vh-100 position-fixed z-3 d-flex justify-content-center align-items-center container"
    setId(id)
  }

  const delCancelClick = () => {
    deleteFormRef.current.className = "w-100 vh-100 position-fixed z-3 d-flex justify-content-center align-items-center container d-none"
    setId(0)
  }

  const delOkCLick = async () => {
    try {
      const resp = await axios.delete(`http://localhost:1337/api/stocks/${id}`, { headers: { Authorization: `Bearer ${token}` } })
      if (resp.status === 200) {
        setUpdated(!updated)
        deleteRef.current.className = "w-75 d-block"
        deleteFormRef.current.className = "w-100 vh-100 position-fixed z-3 d-flex justify-content-center align-items-center container d-none"
        setTimeout(() => {
          deleteRef.current.style.right = "2%"
        }, 100)
        setTimeout(() => {
          deleteRef.current.style.right = "-100%"
          setTimeout(() => {
            deleteRef.current.className = "w-75 d-none"
          }, 300)
        }, 1500);
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getData()
  }, [updated])

  return (
    <div>
      <h1 className='text-center mt-4'>STOCK</h1>
      <div className='container mb-3 mt-3'>
        <input type="text" className="form-control" placeholder="cari nama barang" onChange={(e) => {
          setSearchVal(e.target.value)
          validateSearch()
        }} onFocus={() => setKeyboardVisible(true)} onBlur={() => setTimeout(() => setKeyboardVisible(false), 300)} />
      </div>

      <div className='container'>
        <div className='table-responsive overflow-auto' style={{
          maxHeight: "65vh"
        }}>
          <table className="table table-sm text-center z-2 table-striped">
            <thead className='sticky-top table-light z-2'>
              <tr>
                <th scope="col" className='text-center' style={{
                  fontSize: "12px"
                }}>No</th>
                <th scope="col" className='text-center' style={{
                  fontSize: "12px"
                }}>Nama Barang</th>
                <th scope="col" className='text-center' style={{
                  fontSize: "12px"
                }}>Harga</th>
                <th scope="col" className='text-center' style={{
                  fontSize: "12px"
                }}>Jumlah</th>
                <th scope="col" className='text-center' style={{
                  fontSize: "12px"
                }}>Tanggal</th>
                <th scope="col" className='text-center' style={{
                  fontSize: "12px"
                }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {stockData.map((item) => {
                const dateString = item.attributes.tanggal
                const dateObject = new Date(dateString)
                const options = {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric',
                  second: 'numeric',
                  timeZoneName: 'short',
                  timeZone: 'Asia/Jakarta'
                }
                const formattedDate = new Intl.DateTimeFormat('id-ID', options).format(dateObject);
                const rupiah = formatRupiah(item.attributes.harga)
                return (
                  <tr key={item.id}>
                    <th scope="row" className='text-center' style={{
                      fontSize: "12px"
                    }}>{item.id}</th>
                    <td className='mb-0' style={{
                      fontSize: "12px"
                    }}>{item.attributes.namaBarang}</td>
                    <td className='mb-0' style={{
                      fontSize: "12px"
                    }}>{rupiah}</td>
                    <td className='mb-0' style={{
                      fontSize: "12px"
                    }}>{item.attributes.jumlah}</td>
                    <td className='mb-0' style={{
                      fontSize: "12px"
                    }}>{formattedDate}</td>
                    <td className='mb-0 d-flex justify-content-center'>
                      <button className='btn btn-sm btn-outline-danger' style={{
                        fontSize: "12px"
                      }} onClick={() => delClick(item.id)}>
                        <i className="fa-solid fa-trash"></i>
                      </button>
                      <button className='btn btn-sm btn-outline-success ms-1' style={{
                        fontSize: "12px"
                      }} onClick={() => updateClick(item.id)}>
                        <i className="fa-solid fa-pen-to-square"></i>
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
      <nav aria-label="Page navigation example" className='mt-3'>
        <ul className="pagination pagination-sm justify-content-center">
          <li className="page-item" onClick={() => prevPage()}>
            <a className="page-link text-white" href="#" aria-label="Previous">
              <span aria-hidden="true">«</span>
            </a>
          </li>
          {page.map(item => {
            const pageItems = [];
            for (let i = 1; i <= item.pagination.pageCount; i++) {
              pageItems.push(
                <li key={i} className="page-item" onClick={() => paginationClick(i)}>
                  <a className="page-link text-white" href={`#`}>
                    {i}
                  </a>
                </li>
              );
            }
            return (
              <>
                {pageItems}
              </>
            )
          })}
          <li className="page-item" onClick={() => nextPage()}>
            <a className="page-link text-white" href='#' aria-label="Next">
              <span aria-hidden="true">»</span>
            </a>
          </li>
        </ul>
      </nav>

      <div className='w-100 vh-100 position-fixed z-3 d-flex justify-content-center align-items-center container' style={{
        backgroundColor: "rgba(0,0,0,0.4)",
        top: "-100%",
        transition: "all .3s"
      }} ref={updateFormRef}>
        <div className='bg-dark w-75 py-5 rounded-4 d-flex justify-content-center align-items-center flex-column position-relative dnon'>
          <i className="fa-solid fa-circle-xmark position-absolute fs-4" style={{
            top: 10,
            right: 10
          }} onClick={() => {
            updateFormRef.current.style.top = "-100%"
            setTimeout(() => {
              setIsArray(false)
            }, 300)
          }}></i>
          <h1 className='mb-4'>Update Stock</h1>
          <form action="" className='w-100 container' onSubmit={(e) => updateValidate(e, id)}>
            {isArray ? (
              <>
                <input type="text" className='form-control-sm form-control' value={namaBarang} onChange={(e) => setNamaBarang(e.target.value)} />
                <input type="number" className='form-control-sm form-control my-3' value={harga} onChange={(e) => setHarga(e.target.value)} />
                <input type="number" className='form-control-sm form-control' value={jumlah} onChange={(e) => setJumlah(e.target.value)} />
                <button type='submit' className='btn btn-success w-100 mt-3'>Confirm</button>
              </>
            ) : (
              <></>
            )}
          </form>
        </div>
      </div>
      <div className='w-100 vh-100 position-fixed z-3 d-flex justify-content-center align-items-center container d-none' style={{
        backgroundColor: "rgba(0,0,0,0.4)",
        top: "0%",
        transition: "all .3s"
      }} ref={deleteFormRef}>
        <div className='bg-danger w-75 py-5 rounded-4 d-flex justify-content-center align-items-center flex-column container'>
          <h5 className='text-center'>Are you sure want to delete this stock?</h5>
          <div className=' w-50 d-flex justify-content-between'>
            <button className='btn btn-sm btn-dark' onClick={()=> delOkCLick()}>OK</button>
            <button className='btn btn-sm btn-success' onClick={() => delCancelClick()}>Cancel</button>
          </div>
        </div>
      </div>

      <Navigation keyboardVisible={keyboardVisible} setKeyboardVisible={setKeyboardVisible} active2={colors.black} />

      <AlertSucces reftSucces={succesRef} text={'Update has been successful'} />
      <AlertFailed reftFailed={failedRef} text={'Update failed! err fetch'} />
      <AlertSucces reftSucces={deleteRef} text={'Delete has been successful'} />

    </div>
  );
};

export default Stock;
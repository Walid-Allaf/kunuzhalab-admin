import {
  Box,
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Image, Title } from "../../components";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../api/axiosClient";
import { useConfirm } from "material-ui-confirm";

const Soaps = () => {
  const [soaps, setSoaps] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const confirm = useConfirm();

  const getSoaps = async () => {
    setLoading(true);
    await axiosClient
      .get(`/Soaps/GetAll`)
      .then((res) => {
        setLoading(false);
        setSoaps(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const deleteSoap = async (Id) => {
    confirm({
      title: "Are you sure?",
      description: "You are about to delete this soap!",
      cancellationText: "Cancel",
      confirmationText: "Ok",
      confirmationButtonProps: { color: "error", variant: "contained" },
    })
      .then(async () => {
        setLoading(true);
        await axiosClient
          .delete(`/Soaps/${Id}`)
          .then(() => {
            setLoading(false);
            getSoaps();
          })
          .catch(() => {
            setLoading(false);
          });
      })
      .catch(() => {});
  };

  useEffect(() => {
    getSoaps();
  }, []);

  return (
    <Container sx={{ width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Title text="Products" />
        <Box>
          <Button variant="contained" onClick={() => navigate("/soaps/create")}>
            New product
          </Button>
        </Box>
      </Box>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        {loading ? (
          <Typography>Loading...</Typography>
        ) : (
          <TableContainer sx={{ maxHeight: 640 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Image</TableCell>
                  <TableCell>Soap Age</TableCell>
                  <TableCell>Olive Oil</TableCell>
                  <TableCell>Laurel Oil</TableCell>
                  <TableCell>Most Wanted</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {soaps.length > 0 ? (
                  soaps.map((soap = {}, key) => {
                    const {
                      soapId,
                      name,
                      description,
                      soapAge,
                      oliveOil,
                      laurelOil,
                      mostWanted,
                      image1,
                      image2,
                    } = soap;
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={soapId}>
                        <TableCell>{soapId}</TableCell>
                        <TableCell>{name}</TableCell>
                        <TableCell>{description}</TableCell>
                        <TableCell>
                          <Image src={image1} width={50} height={50} key={soapId} />
                        </TableCell>

                        <TableCell>{soapAge}</TableCell>
                        <TableCell>{oliveOil}</TableCell>
                        <TableCell>{laurelOil}</TableCell>
                        <TableCell sx={{ color: mostWanted ? "success.main" : "error.main" }}>
                          {mostWanted ? "Yes" : "No"}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="outlined"
                            onClick={() =>
                              navigate(`/soaps/${soapId}`, {
                                state: soap,
                              })
                            }
                            sx={{ mr: 2 }}
                          >
                            Update
                          </Button>
                          <Button
                            variant="outlined"
                            color="error"
                            onClick={() => deleteSoap(soapId)}
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={10} sx={{ textAlign: "center" }}>
                      no products
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>
    </Container>
  );
};

export default Soaps;

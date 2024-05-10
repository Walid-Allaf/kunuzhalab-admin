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
// import { useConfirm } from "material-ui-confirm";
// import { countries } from "../../constants";

const TeamMembers = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  // const confirm = useConfirm();

  const getTeamMembers = async () => {
    setLoading(true);
    await axiosClient
      .get(`/TeamMembers/GetAll`)
      .then((res) => {
        setLoading(false);
        setTeamMembers(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const deleteTeamMember = async (Id) => {
    confirm({
      title: "Are you sure?",
      description: "You are about to delete this teamMember!",
      cancellationText: "Cancel",
      confirmationText: "Ok",
      confirmationButtonProps: { color: "error", variant: "contained" },
    })
      .then(async () => {
        setLoading(true);
        await axios
          .delete(`/TeamMembers/${Id}`)
          .then(() => {
            setLoading(false);
            getTeamMembers();
          })
          .catch(() => {
            setLoading(false);
          });
      })
      .catch(() => {});
  };

  useEffect(() => {
    getTeamMembers();
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
        <Title text="Team Members" />
        <Box>
          <Button variant="contained" onClick={() => navigate("/team-members/create")}>
            New team member
          </Button>
        </Box>
      </Box>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        {loading ? (
          <Typography>Loading...</Typography>
        ) : (
          <TableContainer sx={{ maxHeight: 540 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>First name</TableCell>
                  <TableCell>Last name</TableCell>
                  <TableCell>Image</TableCell>

                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {teamMembers.map((teamMember = {}, key) => {
                  const { teamMemberId, firstName, lastName, image1, image2 } = teamMember;
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={teamMemberId}>
                      <TableCell>{teamMemberId}</TableCell>
                      <TableCell>{firstName}</TableCell>
                      <TableCell>{lastName}</TableCell>
                      <TableCell>
                        <Image src={image1} width={50} height={50} key={teamMemberId} />
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outlined"
                          onClick={() =>
                            navigate(`/team-members/${teamMemberId}`, {
                              state: teamMember,
                            })
                          }
                          sx={{ mr: 2 }}
                        >
                          Update
                        </Button>
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={() => deleteTeamMember(teamMemberId)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>
    </Container>
  );
};

export default TeamMembers;

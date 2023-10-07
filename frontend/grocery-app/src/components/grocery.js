import React from "react";
import request from "superagent";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Modal,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import backGround from "../images/backgroud.png";
import FilterAction from "../Utility/FilterAction";
import LoadingSpinner from "./spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const url = "http://localhost:5000/api";

class Grocery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: "",
      name: "",
      quantity: "",
      groceries: [],
      isModalOpen: false,
      isEditing: false,
      editingItemId: null,
      isDeleting: false,
      search: "",
      isLoading: false,
    };
    this.renderGroceryCard = this.renderGroceryCard.bind(this);
  }

  componentDidMount() {
    this.loadGroceries();
  }

  loadGroceries = () => {
    this.setState({ isLoading: true });
    request
      .get(url + "/grocery")
      .set("Content-Type", "application/json")
      .then((response) => {
        if (response.status === 200) {
          this.setState({ groceries: response.body, isLoading: false });
        } else {
          console.error(
            "Error fetching groceries. Status code:",
            response.status
          );
          toast.error(response.body.error);
        }
      })
      .catch((error) => {
        console.error("Error fetching groceries:", error);
        this.setState({ isLoading: false });
      });
  };

  openAddModal = () => {
    this.setState({
      isModalOpen: true,
      isEditing: false,
      name: "",
      quantity: "",
    });
  };

  openEditModal = (item) => {
    this.setState({
      isModalOpen: true,
      isEditing: true,
      _id: item._id,
      name: item.name,
      quantity: item.quantity,
    });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  handleAddItem = (e) => {
    e.preventDefault();
    const { name, quantity } = this.state;
    this.setState({ isLoading: true });
    request
      .post(url + "/grocery/addGrocery")
      .set("Content-Type", "application/json")
      .send({ name, quantity })
      .then((response) => {
        if (response.body.error) {
          toast.error(response.body.error);
        } else {
          this.loadGroceries();
          this.closeModal();
          this.setState({ name: "", quantity: "" });
          toast.success("Item added successfully");
        }
        this.setState({ isLoading: false });
      })
      .catch((error) => {
        console.error("Error adding grocery:", error);
        toast.error("Error adding item");
        this.setState({ isLoading: false });
      });
  };

  handleUpdateItem = (e) => {
    e.preventDefault();
    const { _id, name, quantity } = this.state;
    this.setState({ isLoading: true });
    request
      .put(url + `/grocery/${_id}`)
      .set("Content-Type", "application/json")
      .send({ name, quantity })
      .then((response) => {
        if (response.body.error) {
          toast.error(response.body.error);
        } else {
          this.loadGroceries();
          this.closeModal();
          this.setState({ _id: "", name: "", quantity: "" });
          toast.success("Item updated successfully");
        }
        this.setState({ isLoading: false });
      })
      .catch((error) => {
        console.error("Error updating grocery:", error);
        toast.error("Error updating item");
        this.setState({ isLoading: false });
      });
  };

  handleDeleteItem = (idToDelete) => {
    this.setState({ isLoading: true });
    request
      .delete(url + `/grocery/${idToDelete}`)
      .set("Content-Type", "application/json")
      .then((response) => {
        if (response.body.error) {
          toast.error(response.body.error);
        } else {
          toast.success("Item deleted successfully");
          this.loadGroceries();
        }
        this.setState({ isLoading: false });
      })
      .catch((error) => {
        console.error("Error deleting grocery:", error);
        toast.error("Error deleting item");
        this.setState({ isLoading: false });
      });
  };

  confirmDelete = (item) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      this.setState({ isDeleting: true });
      this.handleDeleteItem(item._id);
    }
  };
  handleSearchChange = (e) => {
    this.setState({ search: e.target.value });
  };

  renderGroceryCard(item) {
    const { search } = this.state;

    if (search && !item.name.toLowerCase().includes(search.toLowerCase())) {
      return null;
    }

    return (
      <Col md={4} className="mb-4" key={item.id}>
        <Card
          className="h-100"
          style={{
            border: "none",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            borderRadius: "10px",
            transition: "transform 0.2s",
          }}
        >
          <Card.Img
            variant="top"
            src={FilterAction.getIcon(item.name)}
            style={{
              height: "200px",
              objectFit: "cover",
            }}
            alt={item.name}
          />
          <Card.Body>
            <Card.Title
              style={{
                fontSize: "18px",
                fontWeight: "bold",
                marginBottom: "10px",
              }}
            >
              {item.name}
            </Card.Title>
            <Card.Text style={{ fontSize: "14px" }}>
              Quantity: {item.quantity}
            </Card.Text>
            <div className="d-flex justify-content-between align-items-center">
              <Button
                variant="primary"
                onClick={() => this.openEditModal(item)}
              >
                Edit
              </Button>
              <Button variant="danger" onClick={() => this.confirmDelete(item)}>
                Delete
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Col>
    );
  }

  render() {
    const { search, groceries, isLoading } = this.state;
    debugger;
    // const filteredGroceries = this.state.groceries.filter((item) =>
    //   item?.name?.toLowerCase().includes(search.toLowerCase())
    // );
    return (
      <Container>
        <div
          className="text-center"
          style={{
            backgroundImage: `url(${backGround})`, // Replace with your header image path
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            padding: "10px 0", // Adjust padding as needed
            marginBottom: 20,
          }}
        >
          <h1 style={{ marginBottom: 50, display: "flex", color: "white" }}>
            Grocery Inventory
          </h1>
        </div>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
        />
        <Row style={styles.spaceBetween}>
          <Col xs={12} sm={6} md={6} lg={12} xl={6}>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Search"
                value={search}
                onChange={this.handleSearchChange}
              />
            </Form.Group>
          </Col>
          <Col xs={12} sm={6} md={6} lg={6} xl={6} style={{ marginBottom: 10 }}>
            <Button onClick={this.openAddModal}>Add Item</Button>
          </Col>
        </Row>
        <Row>
          {isLoading ? ( // Conditionally render the spinner
            <LoadingSpinner />
          ) : (
            groceries?.map((item) => this.renderGroceryCard(item))
          )}
        </Row>

        <Modal show={this.state.isModalOpen} onHide={this.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>
              {this.state.isEditing ? "Edit Item" : "Add Item"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form
              onSubmit={
                this.state.isEditing
                  ? this.handleUpdateItem
                  : this.handleAddItem
              }
            >
              <Form.Group>
                <Form.Label>Name:</Form.Label>
                <Form.Control
                  type="text"
                  value={this.state.name}
                  onChange={(e) => this.setState({ name: e.target.value })}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Quantity:</Form.Label>
                <Form.Control
                  type="text"
                  value={this.state.quantity}
                  onChange={(e) => this.setState({ quantity: e.target.value })}
                  required
                />
              </Form.Group>
              <Button style={{ marginTop: 10 }} type="submit">
                {this.state.isEditing ? "Save Changes" : "Add Item"}
              </Button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.closeModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    );
  }
}

export default Grocery;

const styles = {
  containerStyle: {
    // backgroundImage: `url(${backGround})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    // backgroundAttachment: "fixed",
  },
  spaceBetween: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
};
